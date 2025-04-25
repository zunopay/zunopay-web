"use server";

import { User } from "@/models/user";
import { getAccessToken } from "../http";
import { USER_QUERY_KEYS } from "./keys";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { ReturnResponse } from "@/lib/types";

const { USER, ME, GET, VERIFY_EMAIL, BALANCE } = USER_QUERY_KEYS;

export async function fetchMe(): Promise<ReturnResponse<User>> {
  const accessToken = await getAccessToken();

  const response = await fetchWrapper<User>({
    method: "GET",
    path: `${USER}/${GET}/${ME}`,
    accessToken,
    revalidateCacheInSeconds: 5,
  });
  return response;
}

export async function verifyEmail() {
  const accessToken = await getAccessToken();
  const response = await fetchWrapper<void>({
    method: "PATCH",
    path: `/${USER}/${VERIFY_EMAIL}`,
    accessToken,
  });
  return response;
}

export async function fetchBalance(): Promise<ReturnResponse<string>> {
  const accessToken = await getAccessToken();
  const response = await fetchWrapper<string>({
    method: "GET",
    path: `${USER}/${GET}/${BALANCE}`,
    accessToken
  });
  console.log(response)
  return response;
}
