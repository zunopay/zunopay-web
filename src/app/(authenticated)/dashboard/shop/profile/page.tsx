import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { RoutePath } from "@/enums/RoutePath";
import { fetchMe } from "@/lib/api/user/queries";
import { Text } from "@/components/ui";
import { ShopRegisterForm } from "@/components/forms/ShopRegisterForm";

export default async function ShopProfilePage() {
  const { data: me } = await fetchMe();

  if (!me) return null;

  return (
    <DashboardLayout user={me} activePath={RoutePath.ReferralFees}>
      <Text as='h1' styleVariant='secondary-heading'>Shop Profile</Text>
      <ShopRegisterForm />
    </DashboardLayout>
  );
}
