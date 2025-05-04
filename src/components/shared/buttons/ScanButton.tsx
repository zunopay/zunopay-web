'use client'

import { ScannerDialog } from "@/components/ScannerDialog"
import React, { useState } from "react"

export const ScanButton : React.FC = () => {

    const [showScanner, toggleScanner] = useState(false)

    return (
        <>
        <button
        onClick={() => toggleScanner(!showScanner)}
        className="flex flex-col items-center justify-center -mt-8"
      >
        <div className="bg-blue-zunopay p-4 rounded-full shadow-lg mb-1">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-7 w-7 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1v-2a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1z" 
            />
          </svg>
        </div>
        <span className="text-xs font-medium text-blue-zunopay">Scan</span>
      </button>
        {showScanner && <ScannerDialog toggleScanner={() => toggleScanner(!showScanner)} />}
        </>

    )
}