"use server";

import { getAccessToken } from "../http";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { ReturnResponse } from "@/lib/types";
import { Shop, UserShop } from "@/models/shop";
import { SHOP_QUERY_KEYS } from "./keys";

const { SHOP, GET, REGISTER, UPDATE, GET_USER } = SHOP_QUERY_KEYS;


export async function fetchShops(): Promise<ReturnResponse<Shop[]>> {
  const accessToken = await getAccessToken();

  const response = await fetchWrapper<Shop[]>({
    method: "GET",
    path: `${SHOP}/${GET}`,
    accessToken,
  });

  return response;
}

export async function fetchShop(slug: string): Promise<ReturnResponse<Shop>> {
  const accessToken = await getAccessToken();

  const response = await fetchWrapper<Shop>({
    method: "GET",
    path: `${SHOP}/${GET}/${slug}`,
    accessToken,
  });

  return response;
}

export async function fetchUserShop(): Promise<ReturnResponse<UserShop>> {
  const accessToken = await getAccessToken();

  const response = await fetchWrapper<UserShop>({
    method: "GET",
    path: `${SHOP}/${GET_USER}`,
    accessToken,
  });

  return response;
}

export async function registerShop(
  formData: FormData
): Promise<ReturnResponse<Shop>> {
  const accessToken = await getAccessToken();

  const response = await fetchWrapper<Shop>({
    method: "POST",
    path: `${SHOP}/${REGISTER}`,
    formData,
    accessToken,
  });

  return response;
}

export async function updateShop(
  formData: FormData
): Promise<ReturnResponse<Shop>> {
  const accessToken = await getAccessToken();

  const response = await fetchWrapper<Shop>({
    method: "PATCH",
    path: `${SHOP}/${UPDATE}`,
    formData,
    accessToken,
  });

  return response;
}