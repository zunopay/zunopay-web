import React from 'react'
import { cn } from '@/lib/utils'
import { SidebarProvider } from '@/components/ui/sidebar'
import MerchantDashboardSidebar from './MerchantDashboardSidebar'
import { cookies } from 'next/headers'
import { Text } from '@/components/ui/Text'

type Props = React.PropsWithChildren & {
  title?: string
  mainClassName?: string
  showFooter?: boolean
  activePath?: string
}

export const MerchantDashboardLayout: React.FC<Props> = async ({
  children,
  title,
  mainClassName,
  activePath,
}) => {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true'

  const me = {
    displayName: "Athar",
    avatar: ""
  };

  if (!me) return null

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <MerchantDashboardSidebar activePath={activePath} />
      <main
        className={cn(
          'flex flex-col min-h-screen h-full w-full gap-8 p-4 md:p-6 lg:p-8 flex-1 relative',
          mainClassName
        )}
      >
        <Text as='h4' styleVariant='secondary-heading' className='w-full'>
          {title}
        </Text>

        {children}
      </main>
    </SidebarProvider>
  )
}
