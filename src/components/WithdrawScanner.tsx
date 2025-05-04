"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Text } from "./ui";
import { EnhancedQrScanner } from "./dialogs/EnchanceQrScanner";
import { useIsMobile } from "@/hooks/use-mobile";


export const ScanToPaySection: React.FC<{ className?: string }> = ({
  className,
}) => {
  const [isScanOpen, toggleScanner] = useState(false);
  const isMobile = useIsMobile();

  return (
    <>
      <div
        className={cn(
          "flex flex-col items-center gap-4 p-6 bg-zinc-900 rounded-2xl shadow-lg border border-zinc-800 transform transition-all duration-200 hover:shadow-xl",
          isMobile ? "mx-2 mt-4" : "",
          className
        )}
      >
        <div className="flex justify-center items-center mb-2">
          <div className="flex gap-2 items-center">
            <div className="bg-blue-zunopay/20 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-zunopay"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                <rect width="7" height="7" x="7" y="7" rx="1" />
                <path d="M10 10h1v1h-1z" />
              </svg>
            </div>
            <Text
              as="h3"
              styleVariant="body-large"
              className="font-semibold text-white"
            >
              Scan QR to Pay
            </Text>
          </div>
        </div>
      </div>
      <EnhancedQrScanner
        open={isScanOpen}
        onClose={() => toggleScanner(!isScanOpen)}
        title="Scan to Pay"
        description="Scan a merchant or friend's QR code to make a quick payment"
      />
    </>
  );
};
