"use server";

import { Merchant, RoyaltyEarned, User, WalletBalance } from "@/models/user";
import { getAccessToken } from "../http";
import { USER_QUERY_KEYS } from "./keys";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { ReturnResponse } from "@/lib/types";

const { USER, ME, GET, VERIFY_EMAIL, BALANCE, REWARD_POINTS, ROYALTY_EARNED, GET_MERCHANT, MERCHANT_PROFILE } = USER_QUERY_KEYS;

export async function fetchMerchants(): Promise<ReturnResponse<Merchant[]>> {
  const accessToken = await getAccessToken();

  const response = await fetchWrapper<Merchant[]>({
    method: "GET",
    path: `${USER}/${GET_MERCHANT}`,
    accessToken,
  });

  return response;
}

export async function fetchMerchant(slug: string): Promise<ReturnResponse<Merchant>> {
  const accessToken = await getAccessToken();

  const response = await fetchWrapper<Merchant>({
    method: "GET",
    path: `${USER}/${GET_MERCHANT}/${slug}`,
    accessToken,
  });

  return response;
}

export async function fetchMe(): Promise<ReturnResponse<User>> {
  const accessToken = await getAccessToken();

  const response = await fetchWrapper<User>({
    method: "GET",
    path: `${USER}/${GET}/${ME}`,
    accessToken,
  });

  return response;
}

export async function verifyEmail() {
  const accessToken = await getAccessToken();
  const response = await fetchWrapper<void>({
    method: "PATCH",
    path: `${USER}/${VERIFY_EMAIL}`,
    accessToken,
  });
  return response;
}

export async function fetchBalance(): Promise<ReturnResponse<WalletBalance>> {
  const accessToken = await getAccessToken();

  const response = await fetchWrapper<WalletBalance>({
    method: "GET",
    path: `${USER}/${GET}/${BALANCE}`,
    accessToken,
  });

  return response;
}

export async function fetchRewardPoints(): Promise<ReturnResponse<number>> {
  const accessToken = await getAccessToken();
  const response = await fetchWrapper<number>({
    method: "GET",
    path: `${USER}/${GET}/${REWARD_POINTS}`,
    accessToken,
    isTextResponse: true
  });

  return response;
}

export async function fetchRoyaltyEarned(): Promise<ReturnResponse<RoyaltyEarned[]>> {
  const accessToken = await getAccessToken();
  const response = await fetchWrapper<RoyaltyEarned[]>({
    method: "GET",
    path: `${USER}/${GET}/${ROYALTY_EARNED}`,
    accessToken,
  });

  return response;
}
