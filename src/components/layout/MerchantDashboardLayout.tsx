import React from 'react'
import { cn } from '@/lib/utils'
import { SidebarProvider } from '@/components/ui/sidebar'
import MerchantDashboardSidebar from './MerchantDashboardSidebar'
import { cookies } from 'next/headers'
import { Text } from '@/components/ui/Text'
import { Merchant } from '@/models/merchant'

type Props = React.PropsWithChildren & {
  merchantProfile: Merchant,
  mainClassName?: string
  showFooter?: boolean
  activePath?: string
}

export const MerchantDashboardLayout: React.FC<Props> = async ({
  merchantProfile,
  children,
  mainClassName,
  activePath,
}) => {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true'


  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <MerchantDashboardSidebar activePath={activePath} me={merchantProfile} />
      <main
        className={cn(
          'flex flex-col min-h-screen h-full w-full gap-8 p-4 md:p-6 lg:p-8 flex-1 relative',
          mainClassName
        )}
      >
        <Text as='h4' styleVariant='secondary-heading' className='w-full'>
          Welcome {merchantProfile.displayName}
        </Text>

        {children}
      </main>
    </SidebarProvider>
  )
}
