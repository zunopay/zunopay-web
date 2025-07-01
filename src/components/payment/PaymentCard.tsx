"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ConnectWalletButton } from "../wallet/ConnectWalletButton";
import { Button } from "../ui";
import { Payment } from "@/models/payment";
import {
  useCreateTransferTransaction,
  useSubmitTransferTransaction,
} from "@/api/payment/mutations";
import { encodeTransaction, versionedTransactionFromBs64 } from "@/lib/utils";
import { toast } from "../ui/toast";
import useToggle from "@/hooks/useToggle";
import { LoaderIcon } from "../icons/theme/LoaderIcon";

type Props = {
  payment: Payment | null;
};

export const PaymentCard: React.FC<Props> = ({ payment }) => {
  const [isLoading, toggleLoading] = useToggle();

  const { publicKey, connected, signTransaction } = useWallet();
  const { mutateAsync: createTransferTransaction } =
    useCreateTransferTransaction();
  const { mutateAsync: submitTransferTransaction } =
    useSubmitTransferTransaction();

  const handlePay = async () => {
    if (!publicKey || !payment || !signTransaction) return;

    toggleLoading();

    const { data: transaction, errorMessage } = await createTransferTransaction(
      {
        senderAddress: publicKey.toString(),
        paymentId: payment.publicId,
      }
    );

    if (errorMessage || !transaction) {
      toast({
        description: `Failed to fetch transfer transaction, try again : ${errorMessage}`,
        variant: "error",
      });
      return;
    }

    const deserializedTransaction = versionedTransactionFromBs64(transaction);
    const signedTransaction = await signTransaction(deserializedTransaction);
    const encodedTransaction = encodeTransaction(signedTransaction);

    try {
      const { errorMessage: submitTransferError } =
        await submitTransferTransaction({
          paymentId: payment.publicId,
          transaction: encodedTransaction,
        });

      if (submitTransferError) {
        toast({
          description: `Failed to transfer : ${errorMessage}`,
          variant: "error",
        });
      } else {
        toast({
          description: `Transfer compeleted`,
          variant: "success",
        });
      }
    } catch (e) {
      toast({
        description: `Failed to transfer`,
        variant: "error",
      });
    } finally {
      toggleLoading();
    }
  };

  return (
    <Card className="max-w-[600px] rounded-2xl">
      <CardHeader>Pay with USDC</CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="bg-grey-200 text-white rounded-2xl p-5">
          Total price: <strong>$ {payment?.amount} USDC</strong>
        </div>
        {isLoading ? (
          <LoaderIcon className="w-5 h-5" />
        ) : connected ? (
          <Button onClick={handlePay}>Pay</Button>
        ) : (
          <ConnectWalletButton
            size="md"
            className={`flex gap-2 bg-grey-300 text-grey-100`}
          />
        )}
        <p className="p-2 rounded-xl brightness-110">
          Disclaimer: This is a DeFi payment that can&apos;t be reversed. Funds
          go directly to the merchant. See our terms.
        </p>
      </CardContent>
    </Card>
  );
};
