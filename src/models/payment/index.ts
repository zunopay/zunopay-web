import { Currency } from "@/lib/types";
export interface Receiver {
    name: string;
    id: string; // encoded Iban or upi id (depends on qr provider)
    currency: Currency;
}

export enum TransferStatus {
    Success = 'Success',
    Pending = 'Pending',
    Rejected = 'Rejected'
}

export enum TokenType {
    USDC = 'USDC'
}

export enum TransferType {
    Sent = 'Sent',
    Received = 'Received',
}

export type TransferHistory = {
    id: number;
    amount: number;
    status: TransferStatus;
    signature: string;
    createdAt: Date;
    tokenType: TokenType
    type: TransferType;
}