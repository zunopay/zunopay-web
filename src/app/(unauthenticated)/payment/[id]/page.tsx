import { BackgroundWithNameLayout } from "@/components/layout/BackgroundWithNameLayout";
import { PaymentCard } from "@/components/payment/PaymentCard";
import { fetchPayment } from "@/lib/api/payment/queries";

type Props = {
  params: { id: string };
};

export default async function PaymentCheckout({ params }: Props) {
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
