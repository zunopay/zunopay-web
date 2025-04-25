import { fetchMe } from "@/lib/api/user/queries";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { RoutePath } from "@/enums/RoutePath";
import React from "react";
import WalletCard from "@/components/wallet/WalletCard";

export default async function DashboardPage() {
  const {data: user} = await fetchMe();

  if (!user) return null;

  return (
    <DashboardLayout activePath={RoutePath.Dashboard} user={user}>
      <WalletCard/>
    </DashboardLayout>
  );
}


/**
 * 
 * 1. Generate QR
 * 2. Transaction history
 * 3. Offramps
 * 4. Onramps
 * 5. Point system
 * 
 */