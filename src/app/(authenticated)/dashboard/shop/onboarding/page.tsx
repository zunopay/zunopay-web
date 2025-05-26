import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { RoutePath } from "@/enums/RoutePath";
import { fetchMe } from "@/lib/api/user/queries";
import { Text } from "@/components/ui";
import { ShopRegisterForm } from "@/components/forms/ShopRegisterForm";
import { ShopProfileForm } from "@/components/forms/ShopUpdateForm";
import { Role } from "@/lib/types";
import { ShopOnboardingForm } from "@/components/forms/ShopOnboardingForm";

export default async function ShopProfilePage() {
  const { data: me } = await fetchMe();

  if (!me) return null;

  const isMember = me.role == Role.Member;

  if(!isMember)return <h1>Only members can register on behalf of shops, refer the shops and ask them to compelete shop profile to onboard or connect to get member access</h1>

  return (
    <DashboardLayout user={me} activePath={RoutePath.ShopOnboarding}>
      <Text as="h1" styleVariant="secondary-heading">
        Shop Onboarding
      </Text>
      <ShopOnboardingForm />
    </DashboardLayout>
  );
}
