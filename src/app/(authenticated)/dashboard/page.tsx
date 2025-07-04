import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { RoutePath } from "@/enums/RoutePath";
import React from "react";
import WalletCard from "@/components/wallet/WalletCard";
import { PrivyAuthWrapper } from "@/components/PrivyAuthWrapper";
import { MerchantDiscover } from "@/components/merchant/Discover";
import { fetchMe } from "@/api/user";

export default async function DashboardPage() {
  const {data: user} = await fetchMe();

  if (!user) return null;

  return (
    <DashboardLayout activePath={RoutePath.Dashboard} user={user}>
      <PrivyAuthWrapper>
          <WalletCard/>
      </PrivyAuthWrapper>
      <MerchantDiscover className="max-sm:hidden mt-10"/>
    </DashboardLayout>
  );
}
