import { fetchWrapper } from "@/lib/fetchWrapper";
import { ReturnResponse } from "@/lib/types";
import { Authorization, LoginBody, RegisterBody } from "@/models/auth";
import { AUTH_QUERY_KEYS } from "./authKeys";

const { AUTH, LOGIN, REGISTER } = AUTH_QUERY_KEYS;

export async function login(
  body: LoginBody
): Promise<ReturnResponse<Authorization>> {
  const response = await fetchWrapper<Authorization>({
    method: "PATCH",
    path: `${AUTH}/${LOGIN}`,
    body,
  });

  return response;
}

export async function register(
    body: RegisterBody
  ): Promise<ReturnResponse<Authorization>> {
    const response = await fetchWrapper<Authorization>({
      method: "POST",
      path: `${AUTH}/${REGISTER}`,
      body,
    });
  
    return response;
  }
