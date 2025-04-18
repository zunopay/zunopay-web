import { Role } from "@/lib/types";
import { Merchant } from "../merchant";

// TODO: Fix region types

export interface User {
    id: number,
    username: string,
    email: string,
    avatar: string,
    role: Role, 
    region: 'EU' | 'IN' | 'BR' | 'SG',
    merchant?: Merchant
}
