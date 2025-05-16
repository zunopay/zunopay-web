import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Divider } from "../shared/Divider";
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
import { SoonChip } from "../shared/SoonChip";
import { SearchIcon } from "../icons/sidebar/SearchIcon";
import { ChangeIcon } from "../icons/sidebar/ChangeIcon";
import { CircleDollarSignIcon } from "lucide-react";

type Props = {
  me: User;
  activePath?: string;
};

export function DashboardSidebar({ me, activePath }: Props) {
  return (
    <Sidebar
      variant="inset"
      className="bg-[linear-gradient(151deg,_#0A0B24_-20%,_#2A3DBF_205%)] px-8 py-10"
    >
      <SidebarHeader className="w-full h-auto self-center">
        <LogoWithText />
      </SidebarHeader>

      <Divider className="my-8 opacity-25" />

      <SidebarContent>
        {/* <SidebarTrigger className="absolute top-0 -right-6 shadow-none bg-grey-500 rounded-l-none" /> */}

        <SidebarMenu>
          <SidebarMenuItem
            className={activePath === RoutePath.Dashboard ? "" : "opacity-50"}
          >
            <SidebarMenuLink
              isActive={activePath === RoutePath.Dashboard}
              href={RoutePath.Dashboard}
              title="Home"
              Icon={HomeIcon}
            />
          </SidebarMenuItem>
          <SidebarMenuItem
            className={`flex  ${
              activePath === RoutePath.TransferHistory ? "" : "opacity-50"
            }`}
          >
            <SidebarMenuLink
              isActive={activePath === RoutePath.TransferHistory}
              href={RoutePath.TransferHistory}
              title="Transfer History"
              Icon={TransactionIcon}
            />
          </SidebarMenuItem>
          <SidebarMenuItem
            className={`flex  ${
              activePath === RoutePath.Merchants ? "" : "opacity-50"
            }`}
          >
            <SidebarMenuLink
              isActive={activePath === RoutePath.Merchants}
              href={RoutePath.Merchants}
              title="Discover"
              Icon={SearchIcon}
            />
          </SidebarMenuItem>
          <SidebarMenuItem
            className={`flex  ${
              activePath === RoutePath.ConnectBank ? "" : "opacity-50"
            }`}
          >
            <SidebarMenuLink
              isActive={activePath === RoutePath.ConnectBank}
              href={RoutePath.ConnectBank}
              title="Connect Bank"
              Icon={ChangeIcon}
            />
          </SidebarMenuItem>
          <SidebarMenuItem
            className={`flex  ${activePath === RoutePath.StoreFees ? "" : "opacity-50"}`}
          >
            <SidebarMenuLink
              isActive={activePath === RoutePath.StoreFees}
              href={RoutePath.StoreFees}
              title="Referral Earnings"
              Icon={CircleDollarSignIcon}
            />
          </SidebarMenuItem>
          <SidebarMenuItem
            className={`flex  ${
              activePath === RoutePath.MyProducts ? "" : "opacity-50"
            }`}
          >
            <SidebarMenuLink
              isActive={activePath === RoutePath.MyProducts}
              href={RoutePath.MyProducts}
              title="My Products"
              Icon={ProductIcon}
              disabled={true}
            />
            <SoonChip />
          </SidebarMenuItem>
          <SidebarMenuItem
            className={`flex  ${
              activePath === RoutePath.WithdrawFund ? "" : "opacity-50"
            }`}
          >
            <SidebarMenuLink
              isActive={activePath === RoutePath.WithdrawFund}
              href={RoutePath.WithdrawFund}
              title="Withdraw To Bank"
              Icon={WithdrawIcon}
              disabled={true}
            />
            <SoonChip />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="mt-auto">
        <SidebarMenu>
          <SidebarMenuItem className={false ? "" : "opacity-50"}>
            <SidebarMenuLink
              isActive={false}
              href={RoutePath.Overview}
              title="Help Center"
              Icon={HelpCenterIcon}
            />
          </SidebarMenuItem>

          <SidebarMenuItem className={false ? "" : "opacity-50"}>
            <SidebarMenuLink
              isActive={false}
              href={RoutePath.Overview}
              title="Settings"
              Icon={SettingIcon}
            />
          </SidebarMenuItem>
        </SidebarMenu>

        <Divider className="my-4 opacity-25" />
        <Link
          className="flex gap-3 text-grey-100 opacity-50"
          href={addTwitter("ZunoPay")}
        >
          <XIcon className="size-6" />
          <Text as="p" styleVariant="body-normal">
            @ZunoPay
          </Text>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}

export default DashboardSidebar;
