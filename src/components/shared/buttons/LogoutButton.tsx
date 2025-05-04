"use client";

import { Text } from "@/components/ui/Text";
import { useRouter } from "next/navigation";
import React from "react";
import { logoutAction } from "@/lib/actions/logout";
import { Button } from "@/components/ui";

export const LogoutButton: React.FC = () => {
  const { refresh } = useRouter();

  return (
    <Button
      className="text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-200 border border-white max-w-fit"
      onClick={() => {
        logoutAction();
        refresh();
      }}
      variant="ghost"
      size="md"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 mr-2"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 3a1 1 0 10-2 0v6.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 10-1.414-1.414L14 12.586V6z"
          clipRule="evenodd"
        />
      </svg>
      <Text styleVariant="body-normal" fontWeight="medium" as="span">
        Log out
      </Text>
    </Button>
  );
};
