export interface Receiver {
    id: string; // wallet address or username
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

export enum PaymentCategory {
    OneTime = "OneTime"
}

export type Payment = {
    id: number,
    title: string,
    publicId: string,
    description: string,
    category: PaymentCategory.OneTime,
    createdAt: Date,
    amount: number
}