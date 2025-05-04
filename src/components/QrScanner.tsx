"use client";

import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import Scanner from "../../public/Icons/Scanner.svg";
import { cn } from "@/lib/utils";
import { fetchReceiver } from "@/lib/api/payment/queries";
import { TransferDialog } from "./TransferDialog";
import { Receiver } from "@/models/payment";
import { toast } from "./ui/toast";
import { Text } from "./ui";

export default function QrScanner({
  onScan,
}: {
  onScan: (text: string) => void;
}) {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    scanner.render(
      (decodedText) => {
        onScan(decodedText);
        scanner.clear();
      },
      (errorMessage) => {
        console.log("Scan error:", errorMessage);
      }
    );

    return () => {
      scanner.clear().catch(console.error);
    };
  }, [onScan]);

  return <div id="qr-reader" className="w-full" />;
}


export const ScanToPaySection: React.FC<{ className?: string }> = ({ className }) => {
  const [isScanOpen, toggleScanner] = useState(false);
  const [receiver, setReceiver] = useState<Receiver | null>();
  const [showDialog, toggleDialog] = useState(false);

  const handleScannedData = async (data: string) => {
    const { data: receiver, errorMessage } = await fetchReceiver({ encodedQr: data });
    if (errorMessage) {
      toast({ description: errorMessage, variant: "default" });
      return;
    }
    setReceiver(receiver);
    toggleDialog(true);
  };

  return (
    <>
      <div className={cn("flex flex-col items-center gap-4 p-6 bg-zinc-900 rounded-2xl shadow-md", className)}>
        <Text as="h2" styleVariant='body-large' className="text-blue-zunopay">
          📷 Scan QR to Pay
        </Text>
        {isScanOpen ? (
          <QrScanner onScan={handleScannedData} />
        ) : (
          <ScannerWithCircle onClick={() => toggleScanner(true)} />
        )}
      </div>
      {receiver && (
        <TransferDialog
          receiver={receiver}
          open={showDialog}
          toggleDialog={() => toggleDialog(!showDialog)}
        />
      )}
    </>
  );
};


interface ScannerWithCircleProps {
  onClick: () => void;
}

const ScannerWithCircle: React.FC<ScannerWithCircleProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-blue-zunopay rounded-[50%] h-20 w-20 p-2"
    >
      <Scanner />
    </div>
  );
};
