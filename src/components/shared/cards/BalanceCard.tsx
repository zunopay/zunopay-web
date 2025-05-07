"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import { useFetchBalance, useFetchMe } from "@/api/user/queries";
import { AddFundsDialog } from "@/components/dialogs/AddFundsDialog";
import { WithdrawDialog } from "@/components/dialogs/WithdrawDialog";
import { EnhancedQrScanner } from "@/components/dialogs/EnchanceQrScanner";
import { TransferFormDialog } from "@/components/dialogs/CustomTransferDialog";

export const BalanceCard = () => {
  const { data: fetchedBalance } = useFetchBalance();
  const [showAddFundsDialog, setShowAddFundsDialog] = useState(false);
  const { data: fetchedUser } = useFetchMe();
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
  const [showTransferFormDialog, setShowTransferFormDialog] = useState(false);
  const [showQrScanner, setShowQrScanner] = useState(false);

  const handleWithdrawOptionSelect = (option: "scan" | "transfer") => {
    setShowWithdrawDialog(false);

    if (option === "scan") {
      setShowQrScanner(true);
    } else if (option === "transfer") {
      setShowTransferFormDialog(true);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-dark-300 rounded-2xl shadow-lg p-6 transform transition-all duration-200 hover:shadow-xl border border-gray-100 dark:border-gray-800">
        <div className="flex justify-between items-start mb-4">
          <div>
            <Text
              as="h3"
              styleVariant="secondary-heading"
              className="text-black"
            >
              Current Balance
            </Text>
            <Text as="p" styleVariant="body-small" className="text-black">
              Available for transfers
            </Text>
          </div>
          <span
            className={cn(
              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
              "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100"
            )}
          >
            Active
          </span>
        </div>

        <div className="flex flex-col gap-5 mt-9">
          <div>
            <div className="flex items-baseline">
              <Text
                as="h1"
                styleVariant="secondary-heading"
                className="text-3xl font-bold text-black"
              >
                ${fetchedBalance?.data?.balance || 0}
              </Text>
              {/* <Text
                as="span"
                styleVariant="secondary-heading"
                className="ml-2 text-sm font-medium text-green-500"
              >
                +2.5%
              </Text> */}
            </div>
            <div className="mt-1 flex items-center">
              <Text as="span" styleVariant="body-small" className="text-black">
                Last updated few seconds ago
              </Text>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button
              variant="active"
              onClick={() => setShowAddFundsDialog(!showAddFundsDialog)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add Funds
            </Button>
            <Button
              variant="ghost"
              className="border border-black text-black"
              onClick={() => setShowWithdrawDialog(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Withdraw
            </Button>
          </div>
        </div>
      </div>

      {fetchedUser?.data?.walletAddress && (
        <AddFundsDialog
          open={showAddFundsDialog}
          toggleDialog={() => setShowAddFundsDialog(!showAddFundsDialog)}
          walletAddress={fetchedUser?.data?.walletAddress}
        />
      )}

      <WithdrawDialog
        open={showWithdrawDialog}
        toggleDialog={() => setShowWithdrawDialog(!showWithdrawDialog)}
        onSelectOption={handleWithdrawOptionSelect}
      />
      {showQrScanner && (
        <EnhancedQrScanner
          open={showQrScanner}
          onClose={() => setShowQrScanner(false)}
          title="Withdraw via QR"
          description="Scan a merchant or friend's QR code to make a payment"
        />
      )}
      <TransferFormDialog
        open={showTransferFormDialog}
        toggleDialog={() => setShowTransferFormDialog(!showTransferFormDialog)}
        balance={fetchedBalance?.data?.balance}
      />
    </>
  );
};
