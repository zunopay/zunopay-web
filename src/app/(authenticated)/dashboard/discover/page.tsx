import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { RoutePath } from "@/enums/RoutePath";
import { fetchMe } from "@/api/user";
import { MerchantDiscover } from "@/components/merchant/Discover";

export default async function DiscoverPage() {
  const { data: me } = await fetchMe();

  if (!me) return null;

  return (
    <DashboardLayout user={me} activePath={RoutePath.Discover}>
      <MerchantDiscover />
    </DashboardLayout>
  );
}
