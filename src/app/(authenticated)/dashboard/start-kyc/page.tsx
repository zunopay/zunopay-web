import { fetchMe } from "@/api/user/queries";
import { StartKycForm } from "@/components/forms/StartKycForm";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { LogoWithText } from "@/components/shared/logo/LogoWithText";
import { RoutePath } from "@/enums/RoutePath";
import { getVpaTypeFromRegion } from "@/lib/utils";

export default async function StartKycPage() {
    const {data: me} = await fetchMe();
    if(!me)return null;

  return (
    <DashboardLayout activePath={RoutePath.StartKyc} user={me}>
    <div className="container flex flex-col gap-5 max-w-[400px] p-10 bg-dark-100 rounded-2xl self-center m-auto opacity-1">
      <LogoWithText />
      <StartKycForm vpa={getVpaTypeFromRegion(me.region)}/>
    </div>
  </DashboardLayout>
  )
}
