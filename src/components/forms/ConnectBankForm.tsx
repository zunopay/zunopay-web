"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/components/ui/toast";
import { ConnectedVpa } from "@/models/user";
import { VpaDetails } from "@/lib/types";
import { useConnectVpa } from "@/api/user/queries";
import { isEmpty } from "lodash";

interface BankDetailsFormProps {
  vpa: VpaDetails;
  existingDetails: ConnectedVpa | null;
}

export const ConnectBankForm: React.FC<BankDetailsFormProps> = ({
  vpa,
  existingDetails,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState<{
    vpa: string;
    verification?: boolean;
    isEditing: boolean;
  }>({
    vpa: existingDetails?.vpa || '',
    verification: existingDetails?.verification,
    isEditing: !existingDetails,
  });

  const { mutateAsync: connectVpa } = useConnectVpa();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formState.vpa) {
      toast({
        description: `Please enter your ${vpa.type}`,
        variant: "error",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await connectVpa({ vpa: formState.vpa });

      setFormState((prev) => ({
        ...prev,
        vpa: result.data?.vpa || '',
        verification: result.data?.verification,
        isEditing: false,
      }));


    } catch (error) {
      toast({
        description:
          "There was an error processing your request. Please try again.",
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = () => {
    if (formState.verification == undefined) return;

    let statusStyles = "";
    let statusText = "";

    switch (formState.verification) {
      case false:
        statusStyles = "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
        statusText = "Pending Verification";
        break;
      case true:
        statusStyles = "bg-green-500/20 text-green-500 border-green-500/30";
        statusText = "Verified";
        break;
    }

    return (
      <div
        className={cn(
          "px-3 py-1.5 rounded-full text-xs font-medium border w-fit self-end",
          statusStyles
        )}
      >
        {statusText}
      </div>
    );
  };

  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        <div className="w-full flex justify-end pr-2 pt-2">
            {getStatusBadge()}
        </div>
      <div className="p-6">
        {formState.verification == false && !formState.isEditing && (
          <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-700/20 rounded-lg">
            <Text
              as="p"
              styleVariant="body-small"
              className="text-yellow-400 font-medium"
            >
              Your bank details are being verified
            </Text>
            <Text
              as="p"
              styleVariant="body-small"
              className="text-gray-400 mt-1"
            >
              This process typically takes 1-2 business days. You can update
              your details if needed.
            </Text>
          </div>
        )}

        {formState.verification && (
          <div className="mb-6 p-4 bg-green-900/20 border border-green-700/20 rounded-lg">
            <Text
              as="p"
              styleVariant="body-small"
              className="text-green-400 font-medium"
            >
              Your bank account has been successfully connected!
            </Text>
            <Text
              as="p"
              styleVariant="body-small"
              className="text-gray-400 mt-1"
            >
              You can now receive payments on your {vpa.type}
            </Text>
          </div>
        )}

        {formState.isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="bank-vpa"
                className="block text-sm font-medium text-white"
              >
                {vpa.type}
              </label>
              <Input
                id="bank-vpa"
                placeholder={vpa.placeholder}
                value={formState.vpa}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, vpa: e.target.value }))
                }
                className="bg-zinc-800 border-zinc-700 text-white"
              />
              <Text as="p" styleVariant="body-small" className="text-gray-400">
                Enter your {vpa.type.toLowerCase()} associated with your bank
                account.
              </Text>
            </div>

            <div className="pt-2 flex gap-3">
              {formState.verification && (
                <Button
                  type="button"
                  variant="ghost"
                  className="flex-1 border-zinc-700 text-gray-300 hover:bg-zinc-800 border"
                  onClick={() =>
                    setFormState((prev) => ({ ...prev, isEditing: false }))
                  }
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                variant="primary"
                className={cn("flex-1", formState.verification ? "" : "w-full")}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    Processing...
                  </>
                ) : !isEmpty(formState.vpa) ? (
                  "Update Details"
                ) : (
                  "Connect Bank Account"
                )}
              </Button>
            </div>
          </form>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex flex-col">
                <Text
                  as="span"
                  styleVariant="body-small"
                  className="text-gray-400"
                >
                  {vpa.type}
                </Text>
                <Text
                  as="p"
                  styleVariant="body-normal"
                  className="font-medium text-white mt-1"
                >
                  {formState.vpa}
                </Text>
              </div>
            </div>

            {!formState.verification && (
              <Button
                variant="ghost"
                className="w-full border-zinc-700 text-gray-300 hover:bg-zinc-800 border"
                onClick={() =>
                  setFormState((prev) => ({ ...prev, isEditing: true }))
                }
              >
                Edit Details
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
