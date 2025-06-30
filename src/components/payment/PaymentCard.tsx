'use client'

import { ConnectWalletButton } from "../wallet/ConnectWalletButton"

export const PaymentCard : React.FC = () => {
    return (
        <div>
            <p>Pay</p>
            <ConnectWalletButton />
        </div>
    )
}