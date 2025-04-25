'use client';

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { RoutePath } from "@/enums/RoutePath";

export default function WalletProviderWrapper({ children }: { children: React.ReactNode }) {
  const {ready, authenticated } = usePrivy();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (ready && !authenticated && pathname !== RoutePath.VerifyEmail) {
      router.replace(RoutePath.VerifyEmail);
    }
  }, [authenticated, pathname, router, ready]);

  return <>{children}</>;
}
