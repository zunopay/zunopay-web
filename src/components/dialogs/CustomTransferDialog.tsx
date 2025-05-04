import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { Text } from '@/components/ui/Text';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface TransferFormDialogProps {
  open: boolean;
  toggleDialog: () => void;
  balance: string | undefined;
}

export const TransferFormDialog: React.FC<TransferFormDialogProps> = ({ 
  open, 
  toggleDialog,
  balance 
}) => {
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
    note: '',
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };
  
  const handleConfirmTransfer = () => {
    // Here you would call your API to process the transfer
    console.log('Processing transfer:', formData);
    // Reset and close
    setFormData({ recipient: '', amount: '', note: '' });
    setShowConfirmation(false);
    toggleDialog();
  };
  
  const handleCancel = () => {
    setShowConfirmation(false);
  };

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
            <Text styleVariant={isMobile ? "body-large" : "primary-heading"} as="h3" className="text-white">
              {showConfirmation ? 'Confirm Transfer' : 'Transfer Funds'}
            </Text>
          </DialogTitle>
        </DialogHeader>

        {!showConfirmation ? (
          <>
            <div className="bg-blue-zunopay/10 rounded-lg p-4 flex items-center justify-between">
              <Text as="p" styleVariant="body-normal" className="text-white">
                Available Balance
              </Text>
              <Text as="p" styleVariant="body-large" className="font-semibold text-white">
                ${balance ?? "-.-"}
              </Text>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="recipient" className="block text-sm font-medium text-gray-300 mb-1">
                  Recipient Address
                </label>
                <Input
                  id="recipient"
                  name="recipient"
                  type="text"
                  placeholder="0x... or username"
                  required
                  value={formData.recipient}
                  onChange={handleChange}
                  className="w-full bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">
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
              
              <div>
                <label htmlFor="note" className="block text-sm font-medium text-gray-300 mb-1">
                  Note (Optional)
                </label>
                <Input
                  id="note"
                  name="note"
                  type="text"
                  placeholder="What's this for?"
                  value={formData.note}
                  onChange={handleChange}
                  className="w-full bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              
              <div className="pt-2 flex flex-col gap-3">
                <Button 
                  type="submit"
                  variant="primary"
                  className="w-full"
                >
                  Continue
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
        ) : (
          <div className="space-y-5">
            <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-4 text-yellow-400 text-sm">
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <Text as="p" styleVariant="body-normal" className="font-medium">
                    Confirm Transaction
                  </Text>
                  <Text as="p" styleVariant="body-small" className="mt-1">
                    Please review the details before confirming. This action cannot be undone.
                  </Text>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border border-zinc-800 overflow-hidden">
              <div className="px-4 py-3 bg-zinc-800/50">
                <Text as="p" styleVariant="body-small" className="text-gray-400 uppercase font-medium">
                  Transaction Details
                </Text>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between">
                  <Text as="p" styleVariant="body-small" className="text-gray-400">
                    Recipient:
                  </Text>
                  <Text as="p" styleVariant="body-small" className="text-white font-medium">
                    {formData.recipient}
                  </Text>
                </div>
                <div className="flex justify-between">
                  <Text as="p" styleVariant="body-small" className="text-gray-400">
                    Amount:
                  </Text>
                  <Text as="p" styleVariant="body-small" className="text-white font-medium">
                    ${parseFloat(formData.amount).toFixed(2)} USDC
                  </Text>
                </div>
                {formData.note && (
                  <div className="flex justify-between">
                    <Text as="p" styleVariant="body-small" className="text-gray-400">
                      Note:
                    </Text>
                    <Text as="p" styleVariant="body-small" className="text-white font-medium">
                      {formData.note}
                    </Text>
                  </div>
                )}
                <div className="flex justify-between">
                  <Text as="p" styleVariant="body-small" className="text-gray-400">
                    Fee:
                  </Text>
                  <Text as="p" styleVariant="body-small" className="text-white font-medium">
                    $0.00 USDC
                  </Text>
                </div>
                <div className="pt-2 border-t border-zinc-800">
                  <div className="flex justify-between">
                    <Text as="p" styleVariant="body-normal" className="text-gray-300 font-medium">
                      Total:
                    </Text>
                    <Text as="p" styleVariant="body-normal" className="text-white font-bold">
                      ${parseFloat(formData.amount).toFixed(2)} USDC
                    </Text>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-2 flex flex-col gap-3">
              <Button 
                variant="primary"
                onClick={handleConfirmTransfer}
                className="w-full"
              >
                Confirm Transfer
              </Button>
              <Button 
                variant="ghost"
                onClick={handleCancel}
                className="w-full border-zinc-700 text-gray-300 hover:bg-zinc-800 border"
              >
                Go Back
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};