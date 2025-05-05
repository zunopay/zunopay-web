import { Currency, Role, SupportedRegion } from "@/lib/types";

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
    walletAddress?: string;
}

export interface WalletBalance {
    balance: string,
    currency: Currency
}

export interface ConnectedVpa {
    vpa: string,
    verification: boolean
}

export interface ConnectBank {
    vpa: string
}