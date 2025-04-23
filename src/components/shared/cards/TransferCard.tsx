'use client'
import { fetchDigitalTransferTransaction } from "@/api/payment/queries";
import { Button, Input, Text } from "@/components/ui";
import { Card } from "@/components/ui/card";
import { getConnection } from "@/lib/connection";
import { versionedTransactionFromBs64 } from "@/lib/utils";
import { useSendTransaction } from "@privy-io/react-auth/solana";
import { useState } from "react";

export const TransferCard: React.FC = () => {

  const [amount, setAmount] = useState<number>();
  const [vpa, setVpa] = useState<string>();
  const connection = getConnection();
  const { sendTransaction } = useSendTransaction();

  const handleTransferTransaction = async() => {
    if(!vpa || !amount){
        return
    }

    const encodedTransaction = await fetchDigitalTransferTransaction({ vpa, amount: amount*1000000 });
    const transaction = versionedTransactionFromBs64(encodedTransaction);
    const receipt = await sendTransaction({ transaction, connection });
  }

  return (
    <Card className='w-80 p-6 bg-active-gradient flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
          <Input placeholder="input address to transfer funds" onChange={e => setVpa(e.target.value)}/>
          <Input placeholder="amount" type='number' onChange={e => setAmount(+e.target.value)}/>
      </div>
      <Button onClick={handleTransferTransaction}>Transfer Funds</Button>
    </Card>
  );
};
