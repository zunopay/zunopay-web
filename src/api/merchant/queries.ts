import http, { getAccessToken } from "../http";
import { MERCHANT_QUERY_KEYS } from "./keys";
import { Merchant } from "@/models/merchant";

const { MERCHANT, PROFILE, GET } = MERCHANT_QUERY_KEYS;

export async function fetchMyMerchantProfile() {
    const accessToken = await getAccessToken();
    if(!accessToken)return null;
    
    const response = await http.get<Merchant>(`/${MERCHANT}/${GET}/${PROFILE}`);
    return response.data;
}