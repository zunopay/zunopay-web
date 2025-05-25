"use server";

import { Receiver, TransferHistory } from "@/models/payment";
import {
  GetReceiverParams,
  TransferDigitalParams,
  WithdrawTransactionParams,
} from "@/models/payment/params";
import { PAYMENT_QUERY_KEYS } from "./keys";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { ReturnResponse } from "@/lib/types";
import { getAccessToken } from "../http";

const {
  PAYMENT,
  GET,
  RECEIVER,
  TRANSFER,
  TRANSFER_HISTORY,
  RECEIVE_REQUEST,
  WITHDRAW,
} = PAYMENT_QUERY_KEYS;

export const fetchReceiver = async (
  params: GetReceiverParams
): Promise<ReturnResponse<Receiver>> => {
  const accessToken = await getAccessToken();

  const response = await fetchWrapper<Receiver>({
    method: "GET",
    path: `${PAYMENT}/${GET}/${RECEIVER}`,
    params,
    accessToken,
  });
  return response;
};

export const fetchDigitalTransferTransaction = async (
  params: TransferDigitalParams
): Promise<ReturnResponse<string>> => {
  const accessToken = await getAccessToken();

  const response = await fetchWrapper<string>({
    method: "GET",
    path: `${PAYMENT}/${GET}/${TRANSFER}`,
    params,
    accessToken,
    isTextResponse: true,
  });
  return response;
};

export const fetchWithdrawTransaction = async (
  params: WithdrawTransactionParams
): Promise<ReturnResponse<string>> => {
  const accessToken = await getAccessToken();

  const response = await fetchWrapper<string>({
    method: "GET",
    path: `${PAYMENT}/${GET}/${WITHDRAW}`,
    params,
    accessToken,
    isTextResponse: true,
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

export const fetchReceivePaymentRequest = async (): Promise<
  ReturnResponse<string>
> => {
  const accessToken = await getAccessToken();

  const response = await fetchWrapper<string>({
    method: "GET",
    path: `${PAYMENT}/${GET}/${RECEIVE_REQUEST}`,
    isTextResponse: true,
    accessToken,
  });
  return response;
};
