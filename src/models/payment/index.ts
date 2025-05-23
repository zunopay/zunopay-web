import { Currency } from "@/lib/types";
export interface Receiver {
    id: string // username or wallet address
    currency: TokenType
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
    walletAddress: string;
    signature: string;
    createdAt: Date;
    tokenType: TokenType
    type: TransferType;
}