"use server";

import { getAccessToken } from "../http";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { ReturnResponse } from "@/lib/types";
import { Shop } from "@/models/shop";
import { SHOP_QUERY_KEYS } from "./keys";

const { SHOP, GET } = SHOP_QUERY_KEYS;


export async function fetchShops(): Promise<ReturnResponse<Shop[]>> {
  const accessToken = await getAccessToken();

  const response = await fetchWrapper<Shop[]>({
    method: "GET",
    path: `${SHOP}/${GET}`,
    accessToken,
  });

  return response;
}


