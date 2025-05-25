
export type GetReceiverParams = {
    encodedQr: string;
}

export type TransferDigitalParams = {
    id: string;
    amount: number;
}

export type WithdrawTransactionParams = {
    walletAddress: string;
    amount: number;
}