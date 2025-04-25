'use client'
import { usePrivy } from '@privy-io/react-auth';
import { BalanceCard } from '../shared/cards/BalanceCard';
import { RevenueCard } from '../shared/cards/RevenueCard';
import { TransferCard } from '../shared/cards/TransferCard';

export default function WalletCard() {
    const { user, ready, authenticated, login } = usePrivy();
    if (!ready) {
      return <div>Loading...</div>;
    }
  
    return (
        <>
        {authenticated && user?.wallet && (
          <div className='flex flex-col gap-4'>
            <div className='flex gap-6'>
              <BalanceCard />
              <RevenueCard title='Total Revenue' />
              <RevenueCard title='Daily Revenue' />
            </div>
            <TransferCard /> 
          </div>

        )}
      </>
    )
}