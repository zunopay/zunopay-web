"use client";

import { useLoginWithEmail, usePrivy } from "@privy-io/react-auth";
import React, { useEffect, useState } from "react";
import { PrivyContextProvider } from "@/providers/PrivyContextProvider";
import { useRouter } from "next/navigation";
import { Button, Input } from "../ui";
import { RoutePath } from "@/enums/RoutePath";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { User } from "@/models/user";
import { verifyEmail } from "@/api/user/queries";
import { clientHttp, setClientAuthToken } from "@/lib/clientHttp";
import { USER_QUERY_KEYS } from "@/api/user/keys";

type Props = { me: User, accessToken: string };

export const VerifyEmailWithPrivy: React.FC<Props> = ({ me, accessToken }) => {
  return (
    <PrivyContextProvider appId={process.env.PRIVY_APPLICATION_ID ?? ""}>
      <LoginWithPrivy me={me} accessToken={accessToken}/>
    </PrivyContextProvider>
  );
};

export const LoginWithPrivy: React.FC<Props> = ({ me, accessToken }) => {
  const [code, setCode] = useState("");
  const router = useRouter();
  const [currentTime, setCodeSendTime] = useLocalStorage(
    "VERIFY_CODE_SENT",
    new Date()
  );

  const { sendCode, loginWithCode } = useLoginWithEmail();
  const { ready, authenticated } = usePrivy();
  const { USER, VERIFY_EMAIL } = USER_QUERY_KEYS;

  const submitOtp = async () => {
    await loginWithCode({ code });
  };
  const FIVE_MINUTES_MS = 5 * 60 * 1000;
  const isWithinFiveMinutes =
    new Date().getTime() - currentTime.getTime() <= FIVE_MINUTES_MS;

  
  useEffect(() => {
    if (ready && isWithinFiveMinutes) {
      sendCode({ email: me.email });
      setCodeSendTime(new Date());
    }
  }, [ready]);

  useEffect(() => {
    if (!authenticated) return;
  
    setClientAuthToken(accessToken)
    const processAuthFlow = async () => {
      if (!me.isEmailVerified) {
        await clientHttp.patch(`/${USER}/${VERIFY_EMAIL}`, {} )
      }
  
      router.push(RoutePath.Dashboard);
    };
  
    processAuthFlow();
  }, [authenticated, me.isEmailVerified ]);
  
  return (
    <div>
      <Input onChange={(e) => setCode(e.currentTarget.value)} value={code} />
      <Button variant="active" onClick={submitOtp}>
        Submit
      </Button>
    </div>
  );
};
