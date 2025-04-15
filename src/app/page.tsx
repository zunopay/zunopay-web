'use client'
import { AppWalkthrough } from "@/components/AppWalkthrough"
import { Features } from "@/components/Features"

export default function PaymentApp() {

  return (
    <div className="min-h-screen flex bg-white m-auto px-2 py-5">
        <div className="flex items-center w-full justify-center gap-12 ">
          <Features />
          <AppWalkthrough className="max-md:hidden"/>
        </div>
          {/* <QrScannerSection /> */}
    </div>
  )
}

