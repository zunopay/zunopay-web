'use client'

import { Html5QrcodeScanner } from 'html5-qrcode'
import { useEffect, useState } from 'react'
import Scanner from '../../public/Icons/Scanner.svg'
import { cn } from '@/lib/utils'
import { fetchReceiver } from '@/api/payment/queries'

export default function QrScanner({ onScan }: { onScan: (text: string) => void }) {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: {width: 250, height: 250} },
        /* verbose= */ false
    );

    scanner.render(
      (decodedText) => {
        onScan(decodedText)
        scanner.clear()
      },
      (errorMessage) => {
        console.log('Scan error:', errorMessage)
      }
    )

    return () => {
        scanner.clear().catch(console.error)
    }
  }, [onScan])

  return <div id="qr-reader" className="w-full" />
}

/**
 * 
 * Create a Send Flow after scanning
 * 
 * 
 */

export const ScanToPaySection: React.FC<{className?: string}> = ({ className }) => {
    const [isScanOpen, toggleScanner] = useState<boolean>(false);
    const [, setScannedQr] = useState<string | null>(null);

    const handleScannedData = async (data: string) => {
        setScannedQr(data);
        const receiver = await fetchReceiver({encodedQr: data});
        console.log("Receiver: ", receiver);
    }

    return (
        <div className={cn("flex flex-col items-center gap-2", className)}>
            <h2 className="text-blue-zunopay text-[20px] font-bold">Scan QR and Pay</h2>
            {isScanOpen ? 
                ( <QrScanner onScan={(text) => handleScannedData(text)} /> ) : 
                ( <ScannerWithCircle onClick={() => toggleScanner(true)} /> )
            }
            <h4 className='text-grey-200 text-sm'>Beta version, available only in EU</h4>
        </div>
    )
}

interface ScannerWithCircleProps {
  onClick: () => void;
}

const ScannerWithCircle: React.FC<ScannerWithCircleProps> = ({ onClick }) => {
  return (
    <div onClick={onClick} className='bg-blue-zunopay rounded-[50%] h-20 w-20 p-2'>
      <Scanner  />
    </div>
  )
}