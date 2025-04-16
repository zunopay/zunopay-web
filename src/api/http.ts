'use server'

import { accessTokenKey } from "@/constants/general";
import axios from "axios";
import { cookies } from "next/headers";

export const getAccessToken = async () => {
  const token = (await cookies()).get(accessTokenKey);
  return token;
};

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

http.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = token.value.startsWith("Bearer ")
        ? token.value
        : `Bearer ${token.value}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const removeAuthHeaders = async(): Promise<void> => {
  http.defaults.headers.common.Authorization = "";
};

export default http;
