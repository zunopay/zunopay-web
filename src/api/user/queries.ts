import { User } from "@/models/user";
import http, { getAccessToken } from "../http";
import { USER_QUERY_KEYS } from "./keys";

const { USER, ME, GET } = USER_QUERY_KEYS;

export async function fetchMe() : Promise<{ data: User | null, errorMessage?: string }> {
    const accessToken = await getAccessToken();
    if(!accessToken) return { data: null, errorMessage: "Please login" };
    
    try{
        const response = await http.get<User>(`/${USER}/${GET}/${ME}`);
        return {data: response.data}
    }catch(e){
        return { data: null, errorMessage: "Something went wrong" }
        
    }
}