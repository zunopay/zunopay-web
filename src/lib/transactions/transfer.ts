import { toast } from "@/components/ui/toast";
import { MIN_TRANSFER_AMOUNT_LIMIT } from "@/constants/general";
import { fetchDigitalTransferTransaction } from "../api/payment/queries";
import { versionedTransactionFromBs64 } from "../utils";
import { useSendTransaction } from "@privy-io/react-auth/solana";
import { userKeys } from "@/api/user/userKeys";
import { useQueryClient } from "@tanstack/react-query";
import { getConnection } from "../connection";

export async function transfer({
    id,
    amount,
    sendTransaction,
    queryClient,
    connection
  }: {
    id: string;
    amount: number;
    sendTransaction: ReturnType<typeof useSendTransaction>['sendTransaction'];
    queryClient: ReturnType<typeof useQueryClient>;
    connection: ReturnType<typeof getConnection>;
  }) : Promise<{errorMessage?: string}> {
    if (amount < MIN_TRANSFER_AMOUNT_LIMIT) {
      return { errorMessage:  'Input amount is very small'}
    }
  
    const { data: encodedTransaction, errorMessage } = await fetchDigitalTransferTransaction({
      id,
      amount: amount * 1_000_000
    });

    if (!encodedTransaction) return {errorMessage};
  
    const transaction = versionedTransactionFromBs64(encodedTransaction);
    const receipt = await sendTransaction({ transaction, connection });
  
    queryClient.invalidateQueries({ queryKey: userKeys.getBalance() });
    toast({ description: `Successfully transferred ${amount} $`, variant: 'success' });
    
    return {errorMessage: undefined}
  }
  