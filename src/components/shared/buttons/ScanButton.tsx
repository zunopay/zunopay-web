"use client";

import { EnhancedQrScanner } from "@/components/dialogs/EnchanceQrScanner";
import { ScannerIcon } from "@/components/icons/theme/ScannerIcon";
import { Button } from "@/components/ui";
import React, { useState } from "react";

export const ScanButton: React.FC = () => {
  const [showScanner, toggleScanner] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => toggleScanner(!showScanner)}
        className="flex flex-col items-center p-2"
      >
        <div className="bg-blue-zunopay p-4 rounded-full shadow-lg mb-1">
          <ScannerIcon className="text-white" />
        </div>
        <span className="text-xs font-medium text-blue-zunopay">Scan</span>
      </Button>
      <EnhancedQrScanner
        onClose={() => toggleScanner(!showScanner)}
        open={showScanner}
      />
    </>
  );
};
