'use client'
import { PrivyContextProvider } from '@/providers/PrivyContextProvider';
import { usePrivy } from '@privy-io/react-auth';
import { BalanceCard } from '../shared/cards/BalanceCard';
import { RevenueCard } from '../shared/cards/RevenueCard';

export function WalletContext() {
 
  return (
    <PrivyContextProvider appId={process.env.PRIVY_APPLICATION_ID ?? ''}>
        <PrivyWalletWrapper />
    </PrivyContextProvider>

  );
}

function PrivyWalletWrapper() {
    const { user, ready, authenticated, login } = usePrivy();
    if (!ready) {
      return <div>Loading...</div>;
    }
  
    return (
        <>
        {!authenticated && (
          <button onClick={login}>Verify your email to start using your account !</button>
        )}
        {authenticated && user?.wallet && (
          <div className='flex gap-6'>
            <BalanceCard />
            <RevenueCard title='Total Revenue' />
            <RevenueCard title='Daily Revenue' />
          </div>
        )}
      </>
    )
}