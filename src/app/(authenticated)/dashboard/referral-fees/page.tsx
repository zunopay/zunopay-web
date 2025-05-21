import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { RoutePath } from "@/enums/RoutePath";
import { fetchMe } from "@/lib/api/user/queries";
import ReferredStoreFees from "@/components/table/ReferredStoreFees";
import { Role } from "@/lib/types";
import { BecomeMemberCard } from "@/components/shared/cards/BecomeMemeberCard";

export default async function ReferralFeePage() {
  const { data: me } = await fetchMe();

  if (!me) return null;

  return (
    <DashboardLayout user={me} activePath={RoutePath.ReferralFees}>
      {me.role == Role.Member || me.role == Role.Admin ? (
        <ReferredStoreFees />
      ) : (
        <BecomeMemberCard />
      )}
    </DashboardLayout>
  );
}
