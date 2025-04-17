import { Currency } from "@/lib/types";
export interface Receiver {
    name: string;
    id: string; // encoded Iban or upi id (depends on qr provider)
    currency: Currency;
}

