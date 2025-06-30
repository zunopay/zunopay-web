'use client'

import { BackgroundWithNameLayout } from "@/components/layout/BackgroundWithNameLayout"
import { PaymentCard } from "@/components/payment/PaymentCard"

export default function PaymentCheckout () {
    return (
        <BackgroundWithNameLayout>
            <PaymentCard />
        </BackgroundWithNameLayout>
    )
}