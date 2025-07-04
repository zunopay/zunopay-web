"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { cn } from "@/utils";
import { useFetchBalance, useFetchMe } from "@/api/user/queries";
import { AddFundsDialog } from "@/components/dialogs/AddFundsDialog";
import { PlusCircle } from "lucide-react";

export const BalanceCard = () => {
  const { data: fetchedBalance } = useFetchBalance();
  const [showAddFundsDialog, setShowAddFundsDialog] = useState(false);
  const { data: fetchedUser } = useFetchMe();

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
              
              <PlusCircle />
              Add Funds
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
    </>
  );
};
