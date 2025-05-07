import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { Receiver } from "@/models/payment";
import { TransferDialog } from "./TransferDialog";
import { fetchReceiver } from "@/lib/api/payment/queries";
import { toast } from "../ui/toast";

interface EnhancedQrScannerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export const EnhancedQrScanner: React.FC<EnhancedQrScannerProps> = ({
  open,
  onClose,
  title = "Scan QR Code",
  description = "Position the QR code within the frame to scan",
}) => {
  const isMobile = useIsMobile();
  const [scanning, setScanning] = useState(false);
  const [receiver, setReceiver] = useState<Receiver | null>(null);
  const [showTransferDialog, toggleTransferDialog] = useState<boolean>(false);

  const handleScannedData = async (qr: string) => {
    const { data: receiver, errorMessage } = await fetchReceiver({
      encodedQr: qr,
    });
    if (!receiver || errorMessage) {
      toast({ description: errorMessage, variant: "default" });
      return;
    }

    setReceiver(receiver);
    toggleTransferDialog(true);
  };

  const handleScan = async(decodedText: string) => {
    setScanning(false);
    await handleScannedData(decodedText);
  };

  useEffect(() => {
    if (open) {
      setScanning(true);

      const timer = setTimeout(() => {
        const scanner = new Html5QrcodeScanner(
          "enhanced-qr-reader",
          {
            fps: 10,
            qrbox: {
              width: isMobile ? 220 : 280,
              height: isMobile ? 220 : 280,
            },
            aspectRatio: 1.0,
            showTorchButtonIfSupported: true,
            showZoomSliderIfSupported: true,
            formatsToSupport: [0, 1, 2, 3, 4, 5, 6, 7, 8],
          },
          /* verbose= */ false
        );

        scanner.render(
          async(decodedText) => {
            await handleScan(decodedText);
            scanner.clear();
          },
          (errorMessage) => {
            console.log("Scan error:", errorMessage);
          }
        );

        return () => {
          scanner.clear().catch(console.error);
        };
      }, 500); // Small delay to ensure DOM is ready

      return () => clearTimeout(timer);
    }
  }, [open, isMobile]);

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="bg-zinc-900 border border-zinc-800 shadow-2xl p-5 sm:p-6 max-w-md">
          <DialogHeader className="space-y-2">
            <DialogTitle asChild>
              <Text
                styleVariant="secondary-heading"
                as="h3"
                className="text-white"
              >
                {title}
              </Text>
            </DialogTitle>
            <DialogDescription asChild>
              <Text as="p" styleVariant="body-small" className="text-gray-400">
                {description}
              </Text>
            </DialogDescription>
          </DialogHeader>

          <div className="my-4 flex flex-col items-center">
            <div className="relative w-full max-w-sm mx-auto">
              <div className="absolute -inset-3 bg-blue-zunopay/5 rounded-lg z-0"></div>

              <div className="rounded-lg overflow-hidden shadow-xl border border-zinc-700 relative z-10">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-zunopay/80"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-zunopay/80"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-zunopay/80"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-zunopay/80"></div>

                <div className="absolute inset-0 bg-gradient-to-r from-blue-zunopay/0 via-blue-zunopay/30 to-blue-zunopay/0 opacity-30 animate-scanner-pulse"></div>

                <div
                  id="enhanced-qr-reader"
                  className={cn(
                    "w-full min-h-[260px]",
                    isMobile ? "min-h-[240px]" : "min-h-[300px]"
                  )}
                ></div>
              </div>
            </div>

            {scanning && (
              <div className="mt-4 flex items-center space-x-2 text-blue-zunopay">
                <div className="w-3 h-3 rounded-full bg-blue-zunopay animate-pulse"></div>
                <Text
                  as="span"
                  styleVariant="body-small"
                  className="text-blue-zunopay"
                >
                  Scanning...
                </Text>
              </div>
            )}
          </div>

          <div className="mt-4">
            <Button
              variant="ghost"
              onClick={onClose}
              className="w-full border-zinc-700 text-gray-300 hover:bg-zinc-800 border"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {receiver && (
        <TransferDialog
          receiver={receiver}
          open={showTransferDialog}
          toggleDialog={() => {
            toggleTransferDialog(!showTransferDialog)
            onClose()
          }}
        />
      )}
    </>
  );
};
