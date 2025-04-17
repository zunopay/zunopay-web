'use client'
import { PrivyContextProvider } from '@/providers/PrivyContextProvider';
import { usePrivy } from '@privy-io/react-auth';

export function WalletContext() {
 
  return (
    <PrivyContextProvider appId={process.env.PRIVY_APPLICATION_ID ?? ''}>
        <WalletCard />
    </PrivyContextProvider>

  );
}

function WalletCard() {
    const { user, ready, authenticated, login } = usePrivy();
    if (!ready) {
      return <div>Loading...</div>;
    }
  
    return (
        <div>
        {!authenticated && (
          <button onClick={login}>Log in to access your wallet</button>
        )}
        {authenticated && user?.wallet && (
          <div>
            <p>Your wallet address: {user.wallet.address}</p>
          </div>
        )}
      </div>
    )
}