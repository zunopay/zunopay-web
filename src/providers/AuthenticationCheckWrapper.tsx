'use client'

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useFetchMe } from '@/api/user/queries';
import { RoutePath } from '@/enums/RoutePath';

export const AuthenticationCheckWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: user } = useFetchMe();
  const me = user?.data;

  useEffect(() => {
    if (pathname !== RoutePath.VerifyEmail && me && !me.isEmailVerified) {
      router.push(RoutePath.VerifyEmail);
    }
  }, [pathname, me, router]);

  return (
    <>
        {children}
       
    </>
  );
};
