import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { Text } from '@/components/ui/Text';
import { cn } from '@/utils';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Button } from '@/components/ui/Button';
import { toast } from '@/components/ui/toast';

interface AddFundsDialogProps {
  open: boolean;
  toggleDialog: () => void;
  walletAddress: string;
}

export const AddFundsDialog: React.FC<AddFundsDialogProps> = ({ open, toggleDialog, walletAddress }) => {
  const isMobile = useIsMobile();
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setIsCopied(true);
      toast({
        description: "Wallet address copied to clipboard!",
        variant: "default",
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      toast({
        description: "Failed to copy address. Please try again.",
        variant: 'error',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={toggleDialog}>
      <DialogContent 
        aria-describedby="" 
        className={cn(
          "space-y-5 bg-zinc-900 border border-zinc-800 shadow-2xl",
          isMobile ? "max-w-[95%] p-5" : "max-w-md p-6"
        )}
      >
        <DialogHeader>
          <DialogTitle asChild>
            <Text styleVariant={isMobile ? "body-large" : "primary-heading"} as="h3" className="text-white">
              Add Funds to Wallet
            </Text>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-4 text-yellow-400 text-sm">
            <div className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <Text as="p" styleVariant="body-normal" className="font-medium">
                  Beta Version Notice
                </Text>
                <Text as="p" styleVariant="body-small" className="mt-1">
                  We currently only accept <span className="font-bold">USDC</span> deposits on Solana for the Beta version. 
                  Other tokens sent to this address would not be accounted for.
                </Text>
              </div>
            </div>
          </div>

          <div className="flex justify-center py-2">
            <div className="bg-white p-4 rounded-md shadow-md">
              <QRCode value={walletAddress} size={160} />
            </div>
          </div>
          
          <div>
            <Text as="p" styleVariant="body-normal" className="text-gray-300 mb-2">
              Your Wallet Address
            </Text>
            <div 
              className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 break-all font-mono text-sm relative group"
            >
              <div
                className={cn(
                  "absolute inset-0 bg-blue-zunopay/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                  isCopied ? "opacity-100" : ""
                )}
              >
                <span className="bg-blue-zunopay/90 px-3 py-1 rounded text-white font-medium">
                  {isCopied ? "Copied!" : "Click to Copy"}
                </span>
              </div>
              <div 
                className="cursor-pointer"
                onClick={copyToClipboard}
              >
                {walletAddress}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button 
              variant="primary" 
              onClick={copyToClipboard}
              className={cn(
                "w-full", 
                isMobile ? "py-3 text-base" : "py-2"
              )}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
              Copy Wallet Address
            </Button>
          </div>

          <div className="pt-2">
            <Text as="p" styleVariant="body-small" className="text-center text-gray-400">
              Send only USDC to this address. <br/>
              Funds will appear in your wallet after network confirmation.
            </Text>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
