import { fetchMe } from "@/lib/api/user/queries";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { RoutePath } from "@/enums/RoutePath";
import React from "react";
import WalletCard from "@/components/wallet/WalletCard";
import { PrivyAuthWrapper } from "@/components/PrivyAuthWrapper";
import ScanToPayCard from "@/components/wallet/ScanToPayCard";

export default async function DashboardPage() {
  const {data: user} = await fetchMe();

  if (!user) return null;

  return (
    <DashboardLayout activePath={RoutePath.Dashboard} user={user}>
      <PrivyAuthWrapper>
          <WalletCard/>
          <ScanToPayCard />
      </PrivyAuthWrapper>
    </DashboardLayout>
  );
}


/**
 * 
 * 1. Integerate and Generate Solana PayQR for checkouts 
 * 2. Transfer your QR -> Generate upi qr with writtern supports usdc with ZunoPay
 * 2. Transaction history
 * 3. Offramps
 * 4. Onramps
 * 5. Point system
 * 
 */