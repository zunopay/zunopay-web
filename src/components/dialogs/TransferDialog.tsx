"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Text, Input, Button } from "@/components/ui";
import { LoaderIcon } from "../icons/theme/LoaderIcon";
import { CommonDialogProps } from "@/lib/types";
import { usePrivy } from "@privy-io/react-auth";
import { transfer } from "@/lib/transactions/transfer";
import { Receiver } from "@/models/payment";
import { cleanWalletAddress, isSolanaAddress } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { getConnection } from "@/lib/connection";
import { useSendTransaction } from "@privy-io/react-auth/solana";
import { toast } from "../ui/toast";
import { isEmpty } from "lodash";
import { PointsDialog } from "./PointsDialog";

type Props = {
  receiver: Receiver;
  transferAmount?: number;
} & CommonDialogProps;

export const TransferDialog: React.FC<Props> = ({
  transferAmount,
  receiver,
  open,
  toggleDialog,
}) => {
  const { ready } = usePrivy();
  const [amount, setAmount] = useState(
    transferAmount ? transferAmount.toString() : ""
  );
  const [showPoints, togglePointsDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const queryClient = useQueryClient();
  const { sendTransaction } = useSendTransaction();
  const connection = getConnection();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleTransfer();
  };

  const handleTransfer = async () => {
    const parsedAmount = +amount;

    if (!parsedAmount) return alert("Check details");

    try {
      setIsLoading(true);
      const { errorMessage } = await transfer({
        id: receiver.id,
        amount: parsedAmount,
        sendTransaction,
        queryClient,
        connection,
      });

      if (errorMessage) {
        toast({ description: errorMessage, variant: "error" });
        return;
      }

      togglePointsDialog(true);
    } catch (err) {
      console.error(err);
      toast({ description: "failed to transfer", variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  if (!ready) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={toggleDialog}>
        <DialogContent aria-describedby="" className="max-w-md space-y-4">
          <DialogHeader>
            <DialogTitle asChild>
              <Text styleVariant="primary-heading" as="h3">
                Transfer Funds
              </Text>
            </DialogTitle>
          </DialogHeader>

          {showSuccess ? (
            <div className="space-y-3 text-center">
              <Text as="h3" styleVariant="primary-heading">
                🎉 Transfer successful
              </Text>
              <Text as="h5" styleVariant="secondary-heading">
                You&apos;ve sent {amount} {receiver?.currency} to{" "}
                {isSolanaAddress(receiver?.id)
                  ? cleanWalletAddress(receiver.id)
                  : receiver?.id}
                .
              </Text>
              <Button
                variant="primary"
                onClick={() => {
                  setShowSuccess(false);
                  toggleDialog();
                }}
              >
                Done
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <Text as="p" styleVariant="body-normal">
                Sending to
              </Text>
              <div className="p-3 rounded-lg bg-muted border">
                <Text as="p" styleVariant="body-normal" className="text-bold">
                  {isSolanaAddress(receiver?.id)
                    ? cleanWalletAddress(receiver.id)
                    : receiver?.id}
                </Text>
              </div>

              <Text as="p" styleVariant="body-normal">
                Amount in {receiver?.currency}
              </Text>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <Button
                Icon={isLoading ? LoaderIcon : undefined}
                disabled={isLoading}
                variant="primary"
                type="submit"
                className="mt-2"
              >
                Send
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
      <PointsDialog
        open={showPoints}
        toggleDialog={() => togglePointsDialog(!showPoints)}
        points={7}
      />
    </>
  );
};
