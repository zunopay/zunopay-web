'use client'
import { usePrivy } from '@privy-io/react-auth';
import React from 'react';

type Props = React.PropsWithChildren;

export const PrivyAuthWrapper: React.FC<Props> = ({ children }) => {
  const { user, ready, authenticated, login } = usePrivy();

  if (!ready) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {authenticated && user?.wallet ? children : null}
    </>
  );
};
