"use client";
import { BalanceCard } from "../shared/cards/BalanceCard";
import { RevenueCard } from "../shared/cards/RevenueCard";

export default function WalletCard() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      <BalanceCard />
      <RevenueCard title="Total Revenue" />
      <RevenueCard title="Daily Revenue" />
    </section>
  );
}
