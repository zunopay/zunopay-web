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

export interface RoyaltyEarned {
    fee: number;
    merchant: Merchant
}

export enum MerchantCategory {
    Restraunt = "Restraunt",
    Groceries = "Groceries",
    Other = "Other"
}

export interface Merchant {
    id: number,
    displayName: string,
    cover?: string,
    address: string,
    isVerified: boolean,
    category: MerchantCategory
}