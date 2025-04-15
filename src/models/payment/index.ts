import {Currency} from "@zunopay/common";

export interface Receiver {
    name: string;
    id: string; // encoded Iban or upi id (depends on qr provider)
    currency: Currency;
}
