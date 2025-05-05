"use client";

import React from "react";
import { Text } from "@/components/ui/Text";
import { ConnectBankForm } from "@/components/forms/ConnectBankForm";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { RoutePath } from "@/enums/RoutePath";
import { useFetchConnectedVpa, useFetchMe } from "@/api/user/queries";
import { getVpaTypeFromRegion } from "@/lib/utils";

export default function ConnectBankPage() {
  const { data: me } = useFetchMe();
  const { data: connectedVpa, isLoading } = useFetchConnectedVpa();

  if (!me || !me.data) return;

  return (
    <DashboardLayout activePath={RoutePath.ConnectBank} user={me.data}>
      <div className="w-full max-w-3xl px-4 py-8">
        <div className="mb-8">
          <Text
            as="h1"
            styleVariant="primary-heading"
            className="text-white mb-2"
          >
            Connect Bank Account
          </Text>
          <Text as="p" styleVariant="body-normal" className="text-gray-400">
            Connect your bank account to receive payments directly and withdraw
            funds from your wallet.
          </Text>
        </div>

        {isLoading ? (
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8 flex justify-center items-center min-h-[300px]">
            <div className="flex flex-col items-center gap-4">
              <svg
                className="animate-spin h-10 w-10 text-blue-zunopay"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <Text as="p" styleVariant="body-normal" className="text-gray-400">
                Loading bank details...
              </Text>
            </div>
          </div>
        ) : (
          <ConnectBankForm
            vpa={getVpaTypeFromRegion(me.data.region)}
            existingDetails={connectedVpa?.data || null}
          />
        )}

        <div className="mt-8 rounded-xl bg-zinc-900/50 border border-zinc-800 p-5">
          <div className="flex items-start gap-4">
            <div className="bg-blue-zunopay/20 p-2 rounded-full mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-zunopay"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <Text
                as="h3"
                styleVariant="body-large"
                className="font-medium text-white mb-1"
              >
                About Bank Verification
              </Text>
              <Text as="p" styleVariant="body-small" className="text-gray-400">
                Bank account verification typically takes 1-2 business days.
                Once verified, you&apos;ll be able to receive payments directly to
                your bank account. You can update your details at any time
                before verification is complete.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
