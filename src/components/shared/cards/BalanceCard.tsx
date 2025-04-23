import React from "react";
import { Card } from "../../ui/card";
import { Text } from "../../ui";
import { usePrivy } from "@privy-io/react-auth";
import { useFetchBalance } from "@/hooks/useFetchBalance";

export const BalanceCard: React.FC = () => {
    const { user } = usePrivy()
    const { balance } = useFetchBalance();

    return (
        <Card className='w-80 p-6 bg-active-gradient'>
            <Text as='p' styleVariant='body-small' className='text-grey-100 backdrop-blur-sm'>Total Balance</Text>
            <Text as='h2' styleVariant='body-normal'>{balance} $</Text>
        </Card>
    )
}