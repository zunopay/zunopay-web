import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/Button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Divider } from '../shared/Divider'
import { SidebarLogoutButton } from '../shared/buttons/SidebarLogoutButton'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { SidebarMenuLink } from './SidebarMenuLink'
import { HomeIcon } from '@/components/icons/sidebar/HomeIcon'
import { RoutePath } from '@/enums/RoutePath'
import { LogoWithText } from '../shared/logo/LogoWithText'
import { Merchant } from '@/models/merchant'

type Props = {
  me: Merchant,
  activePath?: string
}

export async function MerchantDashboardSidebar({ me, activePath }: Props) {

  return (
    <Sidebar variant='inset' className='bg-grey-500 p-3'>
      <SidebarHeader className='w-full max-w-[180px] h-auto'>
        <LogoWithText />
      </SidebarHeader>

      <SidebarContent className='py-6'>
        <SidebarTrigger className='absolute top-0 -right-6 shadow-none bg-grey-500 rounded-l-none' />

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuLink
              isActive={activePath === RoutePath.Merchant}
              href={RoutePath.Merchant}
              title='Home'
              Icon={HomeIcon}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuLink
              isActive={activePath === RoutePath.Home}
              href={RoutePath.Home}
              title='My Products'
              Icon={HomeIcon}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuLink
              isActive={activePath === RoutePath.Home}
              href={RoutePath.Home}
              title='Payments'
              Icon={HomeIcon}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuLink
              isActive={activePath === RoutePath.Home}
              href={RoutePath.Home}
              title='Profile'
              Icon={HomeIcon}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuLink
              isActive={activePath === RoutePath.Home}
              href={RoutePath.Home}
              title='Help Center'
              Icon={HomeIcon}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuLink
              isActive={activePath === RoutePath.Home}
              href={RoutePath.Home}
              title='Back to App'
              Icon={HomeIcon}
            />
          </SidebarMenuItem>
        </SidebarMenu>

        <Divider className='my-6' />
        <Button
          Icon={HomeIcon}
          className='w-full bg-yellow-300 text-base font-bold text-black border-5 border-yellow-400 hover:bg-yellow-200 hover:border-yellow-300'
        >
          Create New
        </Button>
      </SidebarContent>

      <SidebarFooter className='mt-auto'>
        <Collapsible>
          <CollapsibleContent animate={false}>
            <SidebarMenu className='border-1 border-grey-300 rounded-lg mb-2'>
              <SidebarMenuItem>
                <SidebarMenuLink
                  isActive={activePath === RoutePath.Home}
                  href={RoutePath.Home}
                  title='Settings'
                  Icon={HomeIcon}
                />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarLogoutButton />
              </SidebarMenuItem>
            </SidebarMenu>
          </CollapsibleContent>

          <CollapsibleTrigger asChild>
            <Button
              Icon={HomeIcon}
              iconPosition='right'
              size='lg'
              className='w-full flex flex-row justify-between gap-2 rounded-lg h-12 hover:bg-grey-700'
            >
              <div className='flex flex-row items-center gap-2'>
                <Avatar className='size-8'>
                  <AvatarImage src={me.user.avatar} />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                {me.displayName}
              </div>
            </Button>
          </CollapsibleTrigger>
        </Collapsible>
      </SidebarFooter>
    </Sidebar>
  )
}

export default MerchantDashboardSidebar
