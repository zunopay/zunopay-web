'use client'

import { Button, Input, Label } from '@/components/ui'
import React, { Suspense, useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { useSearchParams } from 'next/navigation'
import { REDIRECT_TO_KEY } from '@/constants/general'
import { registerAction } from '@/lib/actions/login'
import { FormErrorMessage } from '@/components/forms/FormErrorMessage'
import { onSubmitPreventFormListener } from '@/lib/utils'
import { LoaderIcon } from '@/components/icons/theme/LoaderIcon'
import { Select, SelectItem } from '../ui/Select'

const SubmitButton: React.FC = () => {
  const { pending } = useFormStatus()
  return (
    <Button
      Icon={pending ? LoaderIcon : undefined}
      size='lg'
      className='w-full max-sm:h-[42px]'
      type='submit'
      aria-disabled={pending}
    >
      {pending ? '' : 'Register'}
    </Button>
  )
}

const Form: React.FC = () => {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get(REDIRECT_TO_KEY)
  const [state, action] = useActionState(registerAction.bind(null, redirectTo || ''), null)

  useEffect(() => {
    if (state?.error) {
      console.log(state.error);
      //TODO:
      // toast({
      //   title: 'Error',
      //   description: state.error,
      //   variant: 'error',
      // })
    }
  }, [state?.error])

  return (
    <form action={action} className='space-y-4' onSubmit={onSubmitPreventFormListener(action)}>
      <div className='space-y-6'>
      <div className='flex flex-col w-full space-y-2'>
          <Label>Username</Label>
          <Input placeholder='john.doe' name='username' />
        </div>
        <div className='flex flex-col w-full space-y-2'>
          <Label>Email</Label>
          <Input placeholder='john.doe@dreader.io' name='email' />
        </div>
        <div className='flex flex-col w-full space-y-2'>
          <Label>Password</Label>
          <Input placeholder='********' type='password' name='password' />
        </div>
        <div className='flex flex-col w-full space-y-2'>
          <Label>Region</Label>
          <Select defaultValue='EU' name='region'>
            <SelectItem value='EU'>Europe</SelectItem>
            <SelectItem value='IN'>India</SelectItem>
            <SelectItem value='BR'>Brazil</SelectItem>
            <SelectItem value='SG'>Singapore</SelectItem>
          </Select>
        </div>
        {!state?.success && <FormErrorMessage message={state?.error} />}
      </div>
      <SubmitButton />
    </form>
  )
}

export const RegisterForm: React.FC = () => (
  <Suspense>
    <Form />
  </Suspense>
)
