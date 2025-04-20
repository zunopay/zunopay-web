import { fetchMe } from "@/api/user/queries";
import { CreateMerchantProfileForm } from "@/components/forms/StartKycForm";
import { BackgroundWithNameLayout } from "@/components/layout/BackgroundWithNameLayout";
import { LogoWithText } from "@/components/shared/logo/LogoWithText";

export default async function LoginPage() {
    const {data: me} = await fetchMe();
    if(!me)return null;

  return (
    <BackgroundWithNameLayout>
    <div className="container flex flex-col gap-5 max-w-[400px] p-10 bg-dark-100 rounded-2xl self-center m-auto opacity-1">
      <LogoWithText />
      <CreateMerchantProfileForm vpaType={me.region == 'EU' ? 'Iban' : me.region == 'IN' ? 'Upi id' : 'Pix key'} />
    </div>
  </BackgroundWithNameLayout>
  )
}
