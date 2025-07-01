
export type GetReceiverParams = {
    encodedQr: string;
}

export type CreateTransferTransactionBody = {
    senderAddress: string;
    paymentId: string;
}

export type SubmitTransferBody = {
    transaction: string;
    paymentId: string;
}

export type WithdrawTransactionParams = {
    walletAddress: string;
    amount: number;
}