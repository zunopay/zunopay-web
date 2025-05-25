import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Text } from "@/components/ui/Text";
import { cleanWalletAddress, cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { usePrivy } from "@privy-io/react-auth";
import { useQueryClient } from "@tanstack/react-query";
import { useSendTransaction } from "@privy-io/react-auth/solana";
import { getConnection } from "@/lib/connection";
import { Receiver } from "@/models/payment";
import { CommonDialogProps } from "@/lib/types";
import { transfer } from "@/lib/transactions/transfer";
import { LoaderIcon } from "../icons/theme/LoaderIcon";
import { useFetchReceiver } from "@/api/payment/queries";
import { toast } from "../ui/toast";

type Props = {
  balance: string | undefined;
} & CommonDialogProps;

export const TransferFormDialog: React.FC<Props> = ({
  open,
  toggleDialog,
  balance,
}) => {
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({ username: "", amount: "" });
  const { ready } = usePrivy();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const queryClient = useQueryClient();
  const { sendTransaction } = useSendTransaction();
  const connection = getConnection();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleTransfer();
  };

  const handleTransfer = async () => {
    const parsedAmount = +formData.amount;

    if (!parsedAmount) return alert("Check details");

    try {
      setIsLoading(true);
      const { errorMessage } = await transfer({
        id: formData.username,
        amount: parsedAmount,
        sendTransaction,
        queryClient,
        connection,
      });

      if (errorMessage) {
        toast({ description: errorMessage, variant: "error" });
        return;
      }

      setShowSuccess(true);
    } catch (err) {
      console.error(err);
      toast({description: "failed to transfer", variant: 'error'});
    } finally {
      setIsLoading(false);
    }
  };

  if (!ready) return null;

  return (
    <Dialog open={open} onOpenChange={toggleDialog}>
      <DialogContent
        className={cn(
          "space-y-5 bg-zinc-900 border border-zinc-800 shadow-2xl",
          isMobile ? "max-w-[95%] p-5" : "max-w-md p-6"
        )}
      >
        <DialogHeader>
          <DialogTitle asChild>
            <Text
              styleVariant={isMobile ? "body-large" : "primary-heading"}
              as="h3"
              className="text-white"
            >
              Transfer Funds
            </Text>
          </DialogTitle>
        </DialogHeader>
        {showSuccess ? (
          <div className="space-y-3 text-center max-w-[400px] w-full">
            <Text as="h3" styleVariant="primary-heading">
              🎉 Transfer successful
            </Text>
            <Text as="h5" styleVariant="secondary-heading">
              You&apos;ve sent {formData.amount} USDC to {formData.username}.
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
          <>
            <div className="bg-blue-zunopay/10 rounded-lg p-4 flex items-center justify-between max-w-[400px] w-full">
              <Text as="p" styleVariant="body-normal" className="text-white">
                Available Balance
              </Text>
              <Text
                as="p"
                styleVariant="body-large"
                className="font-semibold text-white"
              >
                ${balance ?? "-.-"}
              </Text>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="recipient"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Recipient Address
                </label>
                <Input
                  id="recipient"
                  name="recipient"
                  type="text"
                  placeholder="Username or Wallet Address"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full bg-zinc-800 border-zinc-700 text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Amount (USDC)
                </label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="0.00"
                  required
                  min="0.01"
                  step="0.01"
                  max={balance}
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full bg-zinc-800 border-zinc-700 text-white"
                />
              </div>

              <div className="pt-2 flex flex-col gap-3">
                <Button type="submit" variant="primary" className="w-full">
                  {isLoading ? <LoaderIcon className="h-5 w-5"/> : "Continue"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={toggleDialog}
                  className="w-full border-zinc-700 text-gray-300 hover:bg-zinc-800"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
