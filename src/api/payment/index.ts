"use server";

import { CreateTransferTransactionBody, Payment, SubmitTransferBody, TransferHistory } from "@/models/payment";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { ReturnResponse } from "@/lib/types";
import { getAccessToken } from "../http";
import { PAYMENT_QUERY_KEYS } from "./keys";

const {
  PAYMENT,
  GET,
  SUBMIT_TRANSFER,
  TRANSFER_HISTORY,
  CREATE_TRANSFER
} = PAYMENT_QUERY_KEYS;


export const fetchPayment = async (
  id: string
): Promise<ReturnResponse<Payment>> => {
  const response = await fetchWrapper<Payment>({
    method: "GET",
    path: `${PAYMENT}/${GET}/${id}`,
  });

  return response;
};

export const createTransferTransaction = async (
  body: CreateTransferTransactionBody
): Promise<ReturnResponse<string>> => {
  const response = await fetchWrapper<string>({
    method: "POST",
    path: `${PAYMENT}/${CREATE_TRANSFER}`,
    body,
    isTextResponse: true,
  });
  return response;
};

export const submitTransferTransaction = async (
  body: SubmitTransferBody
): Promise<ReturnResponse<string>> => {
  const response = await fetchWrapper<string>({
    method: "POST",
    path: `${PAYMENT}/${SUBMIT_TRANSFER}`,
    body,
  });
  return response;
};

export const fetchTransferHistory = async (): Promise<
  ReturnResponse<TransferHistory[]>
> => {
  const accessToken = await getAccessToken();

  const response = await fetchWrapper<TransferHistory[]>({
    method: "GET",
    path: `${PAYMENT}/${GET}/${TRANSFER_HISTORY}`,
    accessToken,
  });
  return response;
};
