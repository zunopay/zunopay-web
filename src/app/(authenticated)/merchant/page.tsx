import { MerchantDashboardLayout } from '@/components/layout/MerchantDashboardLayout'
import { RoutePath } from '@/enums/RoutePath'
import React from 'react'

export default async function DashboardPage() {

  return (
    <MerchantDashboardLayout activePath={RoutePath.Merchant}>
    </MerchantDashboardLayout>
  )
}
