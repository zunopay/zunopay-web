"use client";

import { Card, CardContent, CardHeader } from "../ui/card";
import { ConnectWalletButton } from "../wallet/ConnectWalletButton";

export const PaymentCard: React.FC = () => {
  return (
    <Card className="max-w-[600px] rounded-2xl">
      <CardHeader>Pay with USDC</CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="bg-grey-200 text-white rounded-2xl p-5">
          Total price: <strong>$10 USDC</strong>
        </div>

        <ConnectWalletButton className="w-full" />
        <p className="p-2 rounded-xl brightness-110">
          Disclaimer: This is a DeFi payment that can't be reversed. Funds go
          directly to the merchant. See our terms.
        </p>
      </CardContent>
    </Card>
  );
};
