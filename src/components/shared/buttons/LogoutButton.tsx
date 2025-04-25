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
      className="min-w-fit text-grey-100 bg-[linear-gradient(180deg,rgba(236,236,240,0.08)_0%,rgba(236,236,240,0.04)_100%)] brightness-150"
      onClick={() => {
        logoutAction();
        refresh();
      }}
      size='sm'
    >
      <Text styleVariant="body-normal" fontWeight="medium" as="span" >
        Log out
      </Text>
    </Button>
  );
};
