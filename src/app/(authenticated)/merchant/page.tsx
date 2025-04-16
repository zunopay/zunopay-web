import { fetchMe } from '@/api/user/queries'
import { MerchantDashboardLayout } from '@/components/layout/MerchantDashboardLayout'
import { RoutePath } from '@/enums/RoutePath'
import React from 'react'

export default async function DashboardPage() {
  const me = await fetchMe();

  if (!me) return null

  return (
    <MerchantDashboardLayout title={`Welcome back ${me.username}!`} activePath={RoutePath.Dashboard}>
    </MerchantDashboardLayout>
  )
}
