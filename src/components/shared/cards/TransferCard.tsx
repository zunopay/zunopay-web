"use client";
import { Button, Input, Text } from "@/components/ui";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { LoaderIcon } from "@/components/icons/theme/LoaderIcon";
import { transfer } from "@/lib/transactions/transfer";
import { useQueryClient } from "@tanstack/react-query";
import { useSendTransaction } from "@privy-io/react-auth/solana";
import { getConnection } from "@/lib/connection";

export const TransferCard: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>();
  const [username, setUsername] = useState<string>();
  const queryClient = useQueryClient();
  const { sendTransaction } = useSendTransaction();
  const connection = getConnection();

  const handleTransfer = async () => {
    if (!username || !amount) return alert("Check details");

    try {
      setIsLoading(true);
      await transfer({
        id: username,
        amount,
        sendTransaction,
        queryClient,
        connection,
      });
    } catch (err) {
      console.error(err);
      alert("Transfer failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-80 p-6 bg-active-gradient flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Input
          placeholder="input address to transfer funds"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="amount"
          type="number"
          onChange={(e) => setAmount(+e.target.value)}
        />
      </div>
      <Button onClick={handleTransfer}>
        {isLoading ? <LoaderIcon className="w-5" /> : "Transfer Funds"}
      </Button>
    </Card>
  );
};
