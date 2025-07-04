import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { RoutePath } from "@/enums/RoutePath";
import { Text } from "@/components/ui";
import TransferHistoryTable from "@/components/table/TransferHistory";
import { fetchMe } from "@/api/user";
import { fetchTransferHistory } from "@/api/payment";

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
