'use client'

import { Button, Input, Label } from '@/components/ui'
import React, { Suspense, useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { startKycAction } from '@/lib/actions/login'
import { FormErrorMessage } from '@/components/forms/FormErrorMessage'
import { onSubmitPreventFormListener } from '@/lib/utils'
import { LoaderIcon } from '@/components/icons/theme/LoaderIcon'
import { toast } from '../ui/toast'

const SubmitButton: React.FC = () => {
  const { pending } = useFormStatus()
  return (
    <Button
      Icon={pending ? LoaderIcon : undefined}
      size='lg'
      className='w-full max-sm:h-[42px]'
      type='submit'
      aria-disabled={pending}
      variant='active'
    >
      {pending ? '' : 'Start kyc'}
    </Button>
  )
}

type Props = {
  vpa: {type: string, placeholder: string}
}

const Form: React.FC<Props> = ({ vpa }) => {
  const [state, action] = useActionState(startKycAction, null)
  
  useEffect(() => {
    if (state?.error) {
      console.log(state.error);
      toast({
        title: 'Error',
        description: state.error,
        variant: 'error',
      })
    }
    if(state?.success){
      toast({ description:'Successfully Submitted the request for kyc verification', variant:'success' })
    }
  }, [state?.error])

  return (
    <form action={action} className='space-y-4' onSubmit={onSubmitPreventFormListener(action)}>
      <div className='space-y-6'>
      <div className='flex flex-col w-full space-y-2'>
          <Label>{vpa.type} :</Label>
          <Input placeholder={vpa.placeholder} name='vpa' />
        </div>
        {!state?.success && <FormErrorMessage message={state?.error} />}
      </div>
      <SubmitButton />
    </form>
  )
}

export const StartKycForm: React.FC<Props> = ({vpa}) => (
  <Suspense>
    <Form vpa={vpa} />
  </Suspense>
)
