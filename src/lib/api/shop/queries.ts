"use server";

import { getAccessToken } from "../http";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { ReturnResponse } from "@/lib/types";
import { RegisterShopBody, Shop } from "@/models/shop";
import { SHOP_QUERY_KEYS } from "./keys";

const { SHOP, GET, REGISTER } = SHOP_QUERY_KEYS;


export async function fetchShops(): Promise<ReturnResponse<Shop[]>> {
  const accessToken = await getAccessToken();

  const response = await fetchWrapper<Shop[]>({
    method: "GET",
    path: `${SHOP}/${GET}`,
    accessToken,
  });

  return response;
}

export async function registerShop(
  body: RegisterShopBody
): Promise<ReturnResponse<Shop>> {
  if(!body.shopFront){
    return {errorMessage: 'Missing shopFront image', status: 400, data: null}
  }
  const response = await fetchWrapper<Shop>({
    method: "POST",
    path: `${SHOP}/${REGISTER}`,
    body,
  });

  return response;
}