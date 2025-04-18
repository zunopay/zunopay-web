import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/Button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Divider } from "../shared/Divider";
import { SidebarLogoutButton } from "../shared/buttons/SidebarLogoutButton";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { SidebarMenuLink } from "./SidebarMenuLink";
import { HelpCenterIcon } from "@/components/icons/sidebar/HelpCenterIcon";
import { TransactionIcon } from "@/components/icons/sidebar/TransactionIcon";
import { HomeIcon } from "@/components/icons/sidebar/HomeIcon";
import { ProductIcon } from "@/components/icons/sidebar/ProductIcon";
import { WithdrawIcon } from "@/components/icons/sidebar/WithdrawIcon";
import { SettingIcon } from "@/components/icons/sidebar/SettingIcon";
import { RoutePath } from "@/enums/RoutePath";
import { LogoWithText } from "../shared/logo/LogoWithText";
import Link from "next/link";
import { addTwitter } from "@/lib/utils";
import { XIcon } from "@/components/icons/platform/XIcon";
import { Text } from "../ui";
import { User } from "@/models/user";

type Props = {
  me: User;
  activePath?: string;
};

export async function DashboardSidebar({ me, activePath }: Props) {
  return (
    <Sidebar
      variant="inset"
      className="w-80 bg-[linear-gradient(151deg,_#0A0B24_-20%,_#2A3DBF_205%)] px-8 py-10"
    >
      <SidebarHeader className="w-full max-w-[180px] h-auto self-center">
        <LogoWithText />
      </SidebarHeader>

      <SidebarContent className="py-6">
        {/* <SidebarTrigger className="absolute top-0 -right-6 shadow-none bg-grey-500 rounded-l-none" /> */}

        <SidebarMenu>
          <SidebarMenuItem  className={ activePath === RoutePath.Dashboard ? "" : "opacity-50"}>
            <SidebarMenuLink
              isActive={activePath === RoutePath.Dashboard}
              href={RoutePath.Dashboard}
              title="Home"
              Icon={HomeIcon}
              />
          </SidebarMenuItem>
          <SidebarMenuItem className={ activePath === RoutePath.TransactionHistory ? "" : "opacity-50"}>
            <SidebarMenuLink
              isActive={activePath === RoutePath.TransactionHistory}
              href={RoutePath.TransactionHistory}
              title="Transaction History"
              Icon={TransactionIcon}
              />
          </SidebarMenuItem>
          <SidebarMenuItem  className={ activePath === RoutePath.MyProducts ? "" : "opacity-50"}>
            <SidebarMenuLink
              isActive={activePath === RoutePath.MyProducts}
              href={RoutePath.MyProducts}
              title="My Products"
              Icon={ProductIcon}
            />
          </SidebarMenuItem>
          <SidebarMenuItem  className={ activePath === RoutePath.WithdrawFund ? "" : "opacity-50"}>
            <SidebarMenuLink
              isActive={activePath === RoutePath.WithdrawFund}
              href={RoutePath.WithdrawFund}
              title="Withdraw Funds"
              Icon={WithdrawIcon}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="mt-auto">
        <SidebarMenu>
        <SidebarMenuItem className={ false ? "" : "opacity-50"}>
          <SidebarMenuLink
            isActive={false}
            href={RoutePath.Home}
            title="Help Center"
            Icon={HelpCenterIcon}
          />
        </SidebarMenuItem>

        <SidebarMenuItem className={ false ? "" : "opacity-50"}>
          <SidebarMenuLink
            isActive={false}
            href={RoutePath.Home}
            title="Settings"
            Icon={SettingIcon}
          />
        </SidebarMenuItem>
        </SidebarMenu>

        <Divider className="my-4" />

        {/* <Collapsible>
          <CollapsibleContent animate={false}>
            <SidebarMenu className="border-1 border-grey-300 rounded-lg mb-2">
              <SidebarMenuItem>
                <SidebarMenuLink
                  isActive={activePath === RoutePath.Home}
                  href={RoutePath.Home}
                  title="Settings"
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
              iconPosition="right"
              size="lg"
              className="w-full flex flex-row justify-between gap-2 rounded-lg h-12 hover:bg-grey-700"
            >
              <div className="flex flex-row items-center gap-2">
                <Avatar className="size-8">
                  <AvatarImage src={me.user.avatar} />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                {me.displayName}
              </div>
            </Button>
          </CollapsibleTrigger>
        </Collapsible> */}
        <Link className="flex gap-3 text-grey-100 opacity-50" href={addTwitter("ZunoPay")}>
          <XIcon className="size-6"/>
          <Text as='p' styleVariant='body-normal'>
            @ZunoPay
          </Text>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}

export default DashboardSidebar;
