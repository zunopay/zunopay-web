import React from 'react'
import { cn } from '@/lib/utils'
import { SidebarProvider } from '@/components/ui/sidebar'
import MerchantDashboardSidebar from './MerchantDashboardSidebar'
import { cookies } from 'next/headers'
import { Text } from '@/components/ui/Text'
import { fetchMe } from '@/api/user/queries'

type Props = React.PropsWithChildren & {
  mainClassName?: string
  showFooter?: boolean
  activePath?: string
}

export const MerchantDashboardLayout: React.FC<Props> = async ({
  children,
  mainClassName,
  activePath,
}) => {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true'

  const me = await fetchMe()
  if (!me) return null

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <MerchantDashboardSidebar activePath={activePath} me={me} />
      <main
        className={cn(
          'flex flex-col min-h-screen h-full w-full gap-8 p-4 md:p-6 lg:p-8 flex-1 relative',
          mainClassName
        )}
      >
        <Text as='h4' styleVariant='secondary-heading' className='w-full'>
          Welcome {me.username}
        </Text>

        {children}
      </main>
    </SidebarProvider>
  )
}
