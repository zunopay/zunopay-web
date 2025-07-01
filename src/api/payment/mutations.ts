import { createTransferTransaction, submitTransferTransaction } from "@/lib/api/payment/queries";
import { CreateTransferTransactionBody, SubmitTransferBody } from "@/models/payment/params";
import { useMutation } from "@tanstack/react-query";

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