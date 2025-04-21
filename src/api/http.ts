'use server'

import { accessTokenKey } from "@/constants/general";
import axios from "axios";
import { cookies } from "next/headers";

export const getAccessToken = async () => (await cookies()).get(accessTokenKey)?.value ?? ''

export async function getServerHttp() {
  const token = await getAccessToken();

  const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  });
  
  http.defaults.headers.common.Authorization = token
    ? token.startsWith("Bearer ")
      ? token
      : `Bearer ${token}`
    : "";

  return http
}