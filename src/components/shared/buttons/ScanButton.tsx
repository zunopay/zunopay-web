"use client";

import { EnhancedQrScanner } from "@/components/dialogs/EnchanceQrScanner";
import { ScannerIcon } from "@/components/icons/sidebar/ScannerIcon";
import { Button, Text } from "@/components/ui";
import React, { useState } from "react";

export const ScanButton: React.FC = () => {
  const [showScanner, toggleScanner] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => toggleScanner(!showScanner)}
        className="flex flex-col items-center p-0 gap-1"
      >
        <ScannerIcon className="w-5 h-5" />
        <Text as='p' styleVariant='body-small' className="text-xs font-medium text-blue-zunopay">Scan</Text>
      </Button>
      <EnhancedQrScanner
        onClose={() => toggleScanner(!showScanner)}
        open={showScanner}
      />
    </>
  );
};
