import React from "react";
import { Card } from "../../ui/card";
import { Text } from "../../ui";

interface Props {
    walletAddress: string
}

export const BalanceCard : React.FC = () => {
    return (
        <Card className='w-80 p-6 bg-active-gradient'>
            <Text as='p' styleVariant='body-small' className='text-grey-100 backdrop-blur-sm'>Total Balance</Text>
            <Text as='h2' styleVariant='body-normal'>1,001,912.11</Text>
        </Card>
    )
}