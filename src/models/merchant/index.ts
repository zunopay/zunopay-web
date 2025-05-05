
export enum MerchantCategory {
    Restraunt = "Restraunt",
    Groceries = "Groceries"
}

export interface Merchant {
    id: number
    displayName: string;
    logo: string;
    address: string;
    category: MerchantCategory;
}