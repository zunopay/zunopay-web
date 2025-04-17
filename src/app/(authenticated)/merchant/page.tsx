import { fetchMyMerchantProfile } from '@/api/merchant/queries';
import { MerchantDashboardLayout } from '@/components/layout/MerchantDashboardLayout'
import { Text } from '@/components/ui'
import { RoutePath } from '@/enums/RoutePath'
import React from 'react'

export default async function DashboardPage() {
  const {data: merchantProfile, errorMessage} = await fetchMyMerchantProfile();
  
  if(errorMessage){
    return <h1>{errorMessage}</h1>
  }

  if(!merchantProfile)return null;

  return (
    <MerchantDashboardLayout activePath={RoutePath.Merchant} merchantProfile={merchantProfile}>
      {!merchantProfile.isKycVerified && <Text as='h2' styleVariant='secondary-heading'>Verification pending contact us!</Text>}
    </MerchantDashboardLayout>
  )
}
