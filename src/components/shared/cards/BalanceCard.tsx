'use client'

import React from "react";
import { Card } from "../../ui/card";
import { Text } from "../../ui";
import { useFetchBalance } from "@/api/user/queries";

export const BalanceCard: React.FC = () => {
    const { data: walletBalance } = useFetchBalance();

    return (
        <Card className='w-80 p-6 bg-active-gradient'>
            <Text as='p' styleVariant='body-small' className='text-grey-100 backdrop-blur-sm'>Total Balance</Text>
            <Text as='h2' styleVariant='body-normal'>{walletBalance?.data?.balance} $</Text>
        </Card>
    )
}