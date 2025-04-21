import axios from 'axios';

export const clientHttp = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export function setClientAuthToken(token: string) {
  clientHttp.defaults.headers.common.Authorization = token.startsWith("Bearer ")
    ? token
    : `Bearer ${token}`;
}

export function removeClientAuthToken() {
  delete clientHttp.defaults.headers.common.Authorization;
}