import { fetchMe } from "@/api/user/queries";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Text } from "@/components/ui";
import { WalletContext } from "@/components/wallet/WalletCard";
import { RoutePath } from "@/enums/RoutePath";
import { Role } from "@/lib/types";
import React from "react";

export default async function DashboardPage() {
  const user = await fetchMe();

  if (!user) return null;

  return (
    <DashboardLayout activePath={RoutePath.Dashboard} user={user}>
      {user.role == Role.Merchant && !user.merchant?.isKycVerified ? (
        <Text as="h2" styleVariant="secondary-heading">
          Verification pending contact us!
        </Text>
      ) : (
        <WalletContext />
      )}
    </DashboardLayout>
  );
}
