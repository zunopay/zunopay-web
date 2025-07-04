import { CreateTransferTransactionBody, SubmitTransferBody } from "@/models/payment";
import { useMutation } from "@tanstack/react-query";
import { createTransferTransaction, submitTransferTransaction } from ".";

export const useCreateTransferTransaction = () => {
    return useMutation({
        mutationFn: (body: CreateTransferTransactionBody) => createTransferTransaction(body),
    })
};

export const useSubmitTransferTransaction = () => {
    return useMutation({
        mutationFn: (body: SubmitTransferBody) => submitTransferTransaction(body),
    })
};