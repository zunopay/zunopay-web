import { Role, SupportedRegion } from "@/lib/types";

// TODO: Fix region types
export interface User {
    id: number,
    username: string,
    email: string,
    avatar: string,
    role: Role, 
    region: SupportedRegion,
    isKycVerified: boolean;
    isEmailVerified: boolean;
}
