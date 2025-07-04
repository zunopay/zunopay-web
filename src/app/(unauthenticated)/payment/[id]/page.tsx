import { fetchPayment } from "@/api/payment";
import { BackgroundWithNameLayout } from "@/components/layout/BackgroundWithNameLayout";
import { PaymentCard } from "@/components/payment/PaymentCard";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PaymentCheckout(props : Props) {
  const params = await props.params;
  const { data: payment, errorMessage } = await fetchPayment(params.id);

  if (errorMessage) {
    return null;
  }

  return (
    <BackgroundWithNameLayout>
      <div className="m-auto">
        <PaymentCard payment={payment} />
      </div>
    </BackgroundWithNameLayout>
  );
}
