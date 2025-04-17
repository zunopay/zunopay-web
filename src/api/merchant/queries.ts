import http, { getAccessToken } from "../http";
import { MERCHANT_QUERY_KEYS } from "./keys";
import { Merchant } from "@/models/merchant";

const { MERCHANT, PROFILE, GET } = MERCHANT_QUERY_KEYS;

export async function fetchMyMerchantProfile() : Promise<{ data: Merchant | null, errorMessage?: string, status: number }> {
    const accessToken = await getAccessToken();
    if(!accessToken) return { data:null, errorMessage: 'Unauthorized', status: 500 };

    try{
        const response = await http.get<Merchant>(`/${MERCHANT}/${GET}/${PROFILE}`);
        return {data: response.data, status: response.status};

    }catch(e){
        return {
            data: null,
            errorMessage: 'Something went wrong',
            status: 500
        }
    }
}