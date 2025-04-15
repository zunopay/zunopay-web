import { MerchantDashboardLayout } from '@/components/layout/MerchantDashboardLayout'
import { RoutePath } from '@/enums/RoutePath'
import React from 'react'

export default async function DashboardPage() {
  const me = {
    displayName: "athar"
  };

  if (!me) return null
  // const accessToken = await getAccessToken()

  return (
    <MerchantDashboardLayout title={`Welcome back ${me.displayName}!`} activePath={RoutePath.Dashboard}>
    </MerchantDashboardLayout>
  )
}
