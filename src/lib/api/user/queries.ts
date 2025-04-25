'use server'

import { User } from "@/models/user";
import { getAccessToken, getServerHttp } from "../http";
import { USER_QUERY_KEYS } from "./keys";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { ReturnResponse } from "@/lib/types";

const { USER, ME, GET, VERIFY_EMAIL, BALANCE } = USER_QUERY_KEYS;

export async function fetchMe() : Promise<ReturnResponse<User>> {
    const accessToken = await getAccessToken();
    if(!accessToken) return { data: null, errorMessage: "Please login", status: 400 };

    const response = await fetchWrapper<User>({method: 'GET', path:`${USER}/${GET}/${ME}`, accessToken});
    return response;
}

export async function verifyEmail() {
    const accessToken = await getAccessToken();
    if(!accessToken) return { data: null, errorMessage: "Please login" };
    
    try{
        const http = await getServerHttp();
        const response = await http.patch<void>(`/${USER}/${VERIFY_EMAIL}`);
        return {data: response.data}
    }catch(e){
        console.log(e)
        return { data: null, errorMessage: "Something went wrong" }
    }
}

export async function fetchBalance() : Promise<{data: string | null, errorMessage?: string }>{
    const accessToken = await getAccessToken();
    if(!accessToken) return { data: null, errorMessage: "Please login" };
    
    try{
        const http = await getServerHttp();
        const response = await http.get<string>(`/${USER}/${GET}/${BALANCE}`);
        return {data: response.data}
    }catch(e){
        console.log(e)
        return { data: null, errorMessage: "Something went wrong" }
    }
}