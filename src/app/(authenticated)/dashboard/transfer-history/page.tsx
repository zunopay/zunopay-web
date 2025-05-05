import { fetchMe } from "@/lib/api/user/queries";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { RoutePath } from "@/enums/RoutePath";
import { getVpaTypeFromRegion } from "@/lib/utils";
import { Text } from "@/components/ui";
import TransferHistoryTable from "@/components/table/transfer-history-table";
import { fetchTransferHistory } from "@/lib/api/payment/queries";

export default async function TransferHistoryPage() {
  const { data: me } = await fetchMe();
  if (!me) return null;

  const { data: transfers } = await fetchTransferHistory();

  return (
    <DashboardLayout activePath={RoutePath.TransferHistory} user={me}>
      {transfers ? (
        <TransferHistoryTable transfers={transfers} />
      ) : (
        <Text as="h2" styleVariant="body-normal">
          There are no transfers !
        </Text>
      )}
    </DashboardLayout>
  );
}
