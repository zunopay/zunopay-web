import { User } from "@/models/user";
import http, { getAccessToken } from "../http";
import { USER_QUERY_KEYS } from "./keys";

const { USER, ME, GET } = USER_QUERY_KEYS;

export async function fetchMe() {
    const accessToken = await getAccessToken();
    if(!accessToken)return null;
    
    const response = await http.get<User>(`/${USER}/${GET}/${ME}`);
    return response.data;
}