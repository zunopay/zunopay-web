'use client'
import { fetchDigitalTransferTransaction } from "@/lib/api/payment/queries";
import { Button, Input, Text } from "@/components/ui";
import { Card } from "@/components/ui/card";
import { getConnection } from "@/lib/connection";
import { versionedTransactionFromBs64 } from "@/lib/utils";
import { useSendTransaction } from "@privy-io/react-auth/solana";
import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { LoaderIcon } from "@/components/icons/theme/LoaderIcon";
import { MIN_TRANSFER_AMOUNT_LIMIT } from "@/constants/general";
import { useQueryClient } from "@tanstack/react-query";
import { userKeys } from "@/api/user/userKeys";

export const TransferCard: React.FC = () => {

  const [isLoading, setLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>();
  const [vpa, setVpa] = useState<string>();
  const connection = getConnection();
  const { sendTransaction } = useSendTransaction();
  const queryClient = useQueryClient();

  const handleTransferTransaction = async() => {
    if(!vpa || !amount){
        return
    }

    if(amount < MIN_TRANSFER_AMOUNT_LIMIT){
      toast({ description:"Input about is very small" })
    }

    try{
      setLoading(true)
      const {data: encodedTransaction} = await fetchDigitalTransferTransaction({ vpa, amount: amount*1000000 });
  
      if(!encodedTransaction) return;
  
      const transaction = versionedTransactionFromBs64(encodedTransaction);
      const receipt = await sendTransaction({ transaction, connection });
      setLoading(false)
      queryClient.invalidateQueries({ queryKey: userKeys.getBalance() })
      toast({ description: `Successfully transferred ${amount} $`, variant:'success' })
    }catch(e){
      setLoading(false)
      toast({ description:'Something went wrong !' })
    }
  }

  return (
    <Card className='w-80 p-6 bg-active-gradient flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
          <Input placeholder="input address to transfer funds" onChange={e => setVpa(e.target.value)}/>
          <Input placeholder="amount" type='number' onChange={e => setAmount(+e.target.value)}/>
      </div>
      <Button onClick={handleTransferTransaction}>
        {isLoading ? <LoaderIcon className='w-5'/> : 'Transfer Funds'}
      </Button>
    </Card>
  );
};
