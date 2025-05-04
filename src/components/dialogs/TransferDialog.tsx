'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { Text, Input, Button } from '@/components/ui';
import { LoaderIcon } from '../icons/theme/LoaderIcon';
import { CommonDialogProps } from '@/lib/types';
import { usePrivy } from '@privy-io/react-auth';
import { transfer } from '@/lib/transactions/transfer';
import { Receiver } from '@/models/payment';
import { cleanWalletAddress } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import { getConnection } from '@/lib/connection';
import { useSendTransaction } from '@privy-io/react-auth/solana';


type Props = {receiver: Receiver } & CommonDialogProps;

export const TransferDialog: React.FC<Props> = ({ receiver ,open, toggleDialog }) => {
  const { ready } = usePrivy();
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const queryClient = useQueryClient();
  const {sendTransaction} = useSendTransaction();
  const connection = getConnection();

  const handleTransfer = async () => {
    const parsedAmount = parseFloat(amount);


    if (!parsedAmount || !receiver) return alert('Check details');

    try {
      setIsLoading(true);
      await transfer({vpa: receiver.vpa, amount: parsedAmount, sendTransaction, queryClient, connection});
      setShowSuccess(true);
    } catch (err) {
      console.error(err);
      alert('Transfer failed. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!ready) return null;

  return (
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
            <Text as="h3" styleVariant='primary-heading'>🎉 Transfer successful</Text>
            <Text as="h5" styleVariant='secondary-heading'>
              You&apos;ve sent {amount} {receiver?.currency} to {receiver?.vpa}.
            </Text>
            <Button variant="primary" onClick={() => {
              setShowSuccess(false);
              toggleDialog();
            }}>
              Done
            </Button>
          </div>
        ) : (
          <>
            <Text as='p' styleVariant='body-normal'>Sending to</Text>
            <div className="p-3 rounded-lg bg-muted border">
              <Text as='p' styleVariant='body-normal' className='text-bold'>{receiver?.vpa}</Text>
              <Text as='p' styleVariant='body-small'>
                ({cleanWalletAddress(receiver?.walletAddress)})
              </Text>
            </div>

            <Text as='p' styleVariant='body-normal'>
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
              onClick={handleTransfer}
            >
              Send
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
