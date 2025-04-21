import { getAccessToken } from "@/api/http";
import { fetchMe } from "@/api/user/queries";
import { VerifyEmailWithPrivy } from "@/components/forms/LoginWithPrivy";
import { BackgroundWithNameLayout } from "@/components/layout/BackgroundWithNameLayout";
import { LogoWithText } from "@/components/shared/logo/LogoWithText";

export default async function VerifyEmailPage() {
    const {data: me} = await fetchMe();
    if(!me)return null;

  return (
    <BackgroundWithNameLayout>
    <div className="container flex flex-col gap-5 max-w-[400px] p-10 bg-dark-100 rounded-2xl self-center m-auto opacity-1">
      <LogoWithText />
      <VerifyEmailWithPrivy me={me} accessToken={await getAccessToken()}/>
    </div>
  </BackgroundWithNameLayout>
  )
}
