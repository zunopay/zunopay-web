import React, { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { SidebarProvider } from '@/components/ui/sidebar'
import DashboardSidebar from './DashboardSidebar'
import { Text } from '@/components/ui/Text'
import { User } from '@/models/user'
import { LogoutButton } from '../shared/buttons/LogoutButton'

type Props = React.PropsWithChildren & {
  user: User,
  mainClassName?: string
  showFooter?: boolean
  activePath?: string
}

export const DashboardLayout: React.FC<Props> = async ({
  user,
  children,
  mainClassName,
  activePath,
}) => {

  return (
    <SidebarProvider defaultOpen={true}>
      <DashboardSidebar activePath={activePath} me={user} />
      <main
        className={cn(
          'flex flex-col min-h-screen h-full w-full gap-8 p-4 md:p-6 lg:p-8 flex-1 relative bg-dark-100',
          mainClassName
        )}
      >
        <div className='flex justify-between'>
        <Text as='h1' styleVariant='secondary-heading' className='w-full'>
          Welcome, {user.username}
        </Text>
          <LogoutButton/>
        </div>


        {children}
      </main>
    </SidebarProvider>
  )
}
