import { fetchMe } from "@/lib/api/user/queries";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Text } from "@/components/ui";
import { WalletContext } from "@/components/wallet/WalletCard";
import { RoutePath } from "@/enums/RoutePath";
import React from "react";

export default async function DashboardPage() {
  const {data: user} = await fetchMe();

  if (!user) return null;

  return (
    <DashboardLayout activePath={RoutePath.Dashboard} user={user}>
      {/* {!user?.isKycVerified ? (
        <Text as="h2" styleVariant="secondary-heading">
          Verification pending contact us!
        </Text>
      ) : null} */}
      <WalletContext />
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