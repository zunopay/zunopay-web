import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/Button";

interface WithdrawDialogProps {
  open: boolean;
  toggleDialog: () => void;
  onSelectOption: (option: "scan" | "transfer") => void;
}

export const WithdrawDialog: React.FC<WithdrawDialogProps> = ({
  open,
  toggleDialog,
  onSelectOption,
}) => {
  const isMobile = useIsMobile();

  return (
    <Dialog open={open} onOpenChange={toggleDialog}>
      <DialogContent
        className={cn(
          "space-y-5 bg-zinc-900 border border-zinc-800 shadow-2xl",
          isMobile ? "max-w-[95%] p-5" : "max-w-md p-6"
        )}
      >
        <DialogHeader>
          <DialogTitle asChild>
            <Text
              styleVariant={isMobile ? "body-large" : "primary-heading"}
              as="h3"
              className="text-white"
            >
              Withdraw Funds
            </Text>
          </DialogTitle>
        </DialogHeader>

        <Text as="p" styleVariant="body-normal" className="text-gray-300">
          Choose how you&apos;d like to withdraw your funds
        </Text>

        <div className="grid grid-cols-1 gap-4 pt-2">
          <div
            className="group hover:bg-zinc-800 transition-colors border border-zinc-700 rounded-xl p-4 cursor-pointer"
            onClick={() => onSelectOption("scan")}
          >
            <div className="flex items-start gap-4">
              <div className="bg-blue-zunopay/20 p-3 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-zunopay"
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
              <div className="flex-1">
                <Text
                  as="h4"
                  styleVariant="body-large"
                  className="font-medium text-white group-hover:text-blue-zunopay transition-colors"
                >
                  Scan solana wallet QR code
                </Text>
              </div>
              <div className="text-gray-400 group-hover:text-blue-zunopay transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            className="group hover:bg-zinc-800 transition-colors border border-zinc-700 rounded-xl p-4 cursor-pointer"
            onClick={() => onSelectOption("transfer")}
          >
            <div className="flex items-start gap-4">
              <div className="bg-blue-zunopay/20 p-3 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-zunopay"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 12h-3a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2.5" />
                  <path d="M12 6v2" />
                  <path d="M12 16v2" />
                  <path d="M6 8l8-2" />
                  <path d="M6 16l8 2" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </div>
              <div className="flex-1">
                <Text
                  as="h4"
                  styleVariant="body-large"
                  className="font-medium text-white group-hover:text-blue-zunopay transition-colors"
                >
                  Transfer Funds
                </Text>
                <Text
                  as="p"
                  styleVariant="body-small"
                  className="mt-1 text-gray-400"
                >
                  Transfer funds directly to another wallet address
                </Text>
              </div>
              <div className="text-gray-400 group-hover:text-blue-zunopay transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <Button
            variant="ghost"
            onClick={toggleDialog}
            className="w-full border-zinc-700 text-gray-300 hover:bg-zinc-800 border"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
