import { useFetchReceiver } from "@/api/user/queries";
import React, { useState } from "react";
import { toast } from "./ui/toast";
import { Receiver } from "@/models/payment";
import { TransferDialog } from "./TransferDialog";
import QrScanner from "./QrScanner";
import { fetchReceiver } from "@/lib/api/payment/queries";

type Props = {
    toggleScanner : VoidFunction
}

export const ScannerDialog : React.FC<Props> = ({ toggleScanner }) => {
    const [receiver, setReceiver] = useState<Receiver | null>(null);
    const [showDialog, toggleDialog] = useState<boolean>(false);


    const handleScannedData = async (qr: string) => {
        const { data: receiver, errorMessage } = await fetchReceiver({ encodedQr: qr });
        if (!receiver || errorMessage) {
          toast({ description: errorMessage, variant: "default" });
          return;
        }

        setReceiver(receiver);
        toggleDialog(true)
      };

    return (
        <>
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex flex-col justify-center items-center p-4">
        <div className="bg-zinc-900 rounded-xl w-full max-w-md overflow-hidden shadow-xl">
          <div className="p-4 bg-zinc-800 flex justify-between items-center">
            <h3 className="text-white font-bold">Scan QR Code</h3>
            <button 
              onClick={() => toggleScanner()}
              className="text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-4">
            <QrScanner onScan={handleScannedData} />
            <button 
              onClick={toggleScanner}
              className="mt-4 w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      {receiver && (
        <TransferDialog
          receiver={receiver}
          open={showDialog}
          toggleDialog={() => toggleDialog(!showDialog)}
        />
      )}
      </>
    )
}