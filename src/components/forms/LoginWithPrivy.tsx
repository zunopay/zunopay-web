"use client";

import { useLoginWithEmail, usePrivy } from "@privy-io/react-auth";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Text } from "../ui";
import { RoutePath } from "@/enums/RoutePath";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { User } from "@/models/user";
import { setClientAuthToken } from "@/lib/clientHttp";
import { useVerifyEmail } from "@/api/user/queries";
import { toast } from "../ui/toast";
import { useQueryClient } from "@tanstack/react-query";
import { userKeys } from "@/api/user/userKeys";
import { LoaderIcon } from "../icons/theme/LoaderIcon";

type Props = { me: User; accessToken: string };

export const VerifyEmailWithPrivy: React.FC<Props> = ({ me, accessToken }) => {
  return <LoginWithPrivy me={me} accessToken={accessToken} />;
};

export const LoginWithPrivy: React.FC<Props> = ({ me, accessToken }) => {
  const [code, setCode] = useState("");
  const router = useRouter();
  const [currentTime, setCodeSendTime] = useLocalStorage(
    "VERIFY_CODE_SENT",
    new Date()
  );

  const { sendCode, loginWithCode } = useLoginWithEmail();
  const { mutateAsync: verifyEmail } = useVerifyEmail();
  const [isLoading, setIsLoading] = useState<boolean>();
  const { ready, user } = usePrivy();
  const queryClient = useQueryClient();

  const submitOtp = async () => {
    await loginWithCode({ code });
  };

  const isFiveMinutesElapesed = currentTime < new Date();
  useEffect(() => {
    if (ready && isFiveMinutesElapesed) {
      console.log("SENT");
      const FIVE_MINUTES_MS = 5 * 60 * 1000;
      const fiveMinutesLater = new Date(Date.now() + FIVE_MINUTES_MS);

      sendCode({ email: me.email });
      setCodeSendTime(fiveMinutesLater);
    }
  }, [ready]);

  useEffect(() => {
    if (!user || !user.email) return;

    if (user.email.address != me.email) {
      toast({ description: "Invalid email" });
      return;
    }

    setClientAuthToken(accessToken);
    const processAuthFlow = async () => {
      setIsLoading(true)
      if (!me.isEmailVerified) {
        await verifyEmail();
        await queryClient.invalidateQueries({queryKey: userKeys.getMe()});
      }
      setIsLoading(false)
      router.push(RoutePath.Dashboard);
    };

    processAuthFlow();
  }, [user, me.isEmailVerified]);

  return (
    <div className="flex flex-col gap-4">
      <Input
        onChange={(e) => setCode(e.currentTarget.value)}
        value={code}
        placeholder="Input OTP"
      />
      <Button variant="active" onClick={submitOtp}>
        {isLoading ? <LoaderIcon className="w-4 h-4"/> : "Submit"}
      </Button>
      <Text as="p" styleVariant="body-small" className="text-wrap">
        OTP has been send to email: <b>{me.email}</b>
      </Text>
    </div>
  );
};
