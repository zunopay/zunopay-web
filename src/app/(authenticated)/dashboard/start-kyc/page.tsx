import { fetchMe } from "@/lib/api/user/queries";
import { StartKycForm } from "@/components/forms/StartKycForm";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { RoutePath } from "@/enums/RoutePath";
import { getVpaTypeFromRegion } from "@/lib/utils";
import { Text } from "@/components/ui";

export default async function StartKycPage() {
  const { data: me } = await fetchMe();
  if (!me) return null;

  return (
    <DashboardLayout activePath={RoutePath.StartKyc} user={me}>
      {me.isKycVerified ? (
        <Text as="p" styleVariant="body-normal">
          You&apos;re banking details have been verified!
        </Text>
      ) : (
        <div className="flex flex-col gap-5 max-w-[450px] p-10 bg-blue-700 border border-white rounded-2xl opacity-1">
          <Text as='h3' styleVariant='primary-heading'>Enter your banking details</Text>
          <StartKycForm vpa={getVpaTypeFromRegion(me.region)} />
        </div>
      )}
    </DashboardLayout>
  );
}
