'use client';

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { RoutePath } from "@/enums/RoutePath";

export default function WalletProviderWrapper({ children }: { children: React.ReactNode }) {
  const { authenticated, user } = usePrivy();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!authenticated && pathname !== RoutePath.VerifyEmail) {
      router.replace(RoutePath.VerifyEmail);
    }
  }, [authenticated, pathname, router]);

  return <>{children}</>;
}
