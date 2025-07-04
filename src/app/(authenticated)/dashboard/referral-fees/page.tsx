import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { RoutePath } from "@/enums/RoutePath";
import ReferredMerchantFees from "@/components/table/ReferredMerchantFees";
import { Role } from "@/lib/types";
import { BecomeMemberCard } from "@/components/shared/cards/BecomeMemeberCard";
import { fetchMe } from "@/api/user";

export default async function ReferralFeePage() {
  const { data: me } = await fetchMe();

  if (!me) return null;

  return (
    <DashboardLayout user={me} activePath={RoutePath.ReferralFees}>
      {me.role == Role.Member || me.role == Role.Admin ? (
        <ReferredMerchantFees />
      ) : (
        <BecomeMemberCard />
      )}
    </DashboardLayout>
  );
}
