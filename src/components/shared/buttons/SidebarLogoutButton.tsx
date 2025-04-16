'use client'

import { Text } from '@/components/ui/Text'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SidebarMenuButton } from '@/components/ui/sidebar'
import { HomeIcon } from '@/components/icons/sidebar/HomeIcon'
import { logoutAction } from '@/lib/actions/logout'

export const SidebarLogoutButton: React.FC = () => {
  const { refresh } = useRouter()

  return (
    <SidebarMenuButton asChild className='text-grey-100 hover:bg-grey-600 hover:text-white'>
      <button
        onClick={() => {
          logoutAction()
          refresh()
        }}
      >
        <HomeIcon className='size-5' />
        <Text styleVariant='body-normal' fontWeight='medium' as='span'>
          Log out
        </Text>
      </button>
    </SidebarMenuButton>
  )
}
