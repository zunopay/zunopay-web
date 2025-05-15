export enum MerchantCategory {
  Restraunt = "Restraunt",
  Groceries = "Groceries",
}

export enum MerchantStatus {
  Active = "Active",
  Upcoming = "Upcoming",
  InActive = "InActive",
}

export interface Merchant {
  id: number;
  ratings: number;
  displayName: string;
  logo: string;
  address: string;
  category: MerchantCategory;
  status: MerchantStatus;
}
