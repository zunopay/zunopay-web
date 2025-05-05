"use server";

import { getAccessToken } from "../http";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { ReturnResponse } from "@/lib/types";
import { MERCHANT_QUERY_KEYS } from "./keys";
import { Merchant } from "@/models/merchant";

const { MERCHANT, GET } = MERCHANT_QUERY_KEYS;


export async function fetchMerchants(): Promise<ReturnResponse<Merchant[]>> {
  const accessToken = await getAccessToken();

  const response = await fetchWrapper<Merchant[]>({
    method: "GET",
    path: `${MERCHANT}/${GET}`,
    accessToken,
  });

  return response;
}


