"use client";
import { BalanceCard } from "../shared/cards/BalanceCard";
import { RevenueCard } from "../shared/cards/RevenueCard";
import { TransferCard } from "../shared/cards/TransferCard";

export default function WalletCard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-6">
        <BalanceCard />
        <RevenueCard title="Total Revenue" />
        <RevenueCard title="Daily Revenue" />
      </div>
      <TransferCard />
    </div>
  );
}
