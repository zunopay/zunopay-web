import React, { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { SidebarProvider } from '@/components/ui/sidebar'
import DashboardSidebar from './DashboardSidebar'
import { Text } from '@/components/ui/Text'
import { User } from '@/models/user'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { Button } from '../ui'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { AvatarImage } from '../shared/AvatarImage'
import { AvatarLogoutButton } from '../shared/buttons/AvatarLogoutButton'

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
          <AvatarWithLogout avatar={user.avatar}/>
        </div>


        {children}
      </main>
    </SidebarProvider>
  )
}

const AvatarWithLogout : React.FC<{avatar:string}> = ({avatar}) => {
  return (

        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button
              variant='ghost'
              className="max-w-fit max-h-fit flex flex-row justify-between gap-2 rounded-lg"
            >
              <div className="flex flex-row items-center gap-2">
                <Avatar className="size-8">
                  <AvatarImage src={avatar} />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
              </div>
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent animate={false}>
                <AvatarLogoutButton />
          </CollapsibleContent>
        </Collapsible>
  )
}
