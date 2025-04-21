import { User } from "@/models/user";
import { getAccessToken, getServerHttp } from "../http";
import { USER_QUERY_KEYS } from "./keys";

const { USER, ME, GET, VERIFY_EMAIL } = USER_QUERY_KEYS;

export async function fetchMe() : Promise<{ data: User | null, errorMessage?: string }> {
    const accessToken = await getAccessToken();
    if(!accessToken) return { data: null, errorMessage: "Please login" };
    
    try{
        const http = await getServerHttp();
        const response = await http.get<User>(`/${USER}/${GET}/${ME}`);
        return {data: response.data}
    }catch(e){
        return { data: null, errorMessage: "Something went wrong" }
        
    }
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