export enum ShopCategory {
  Restraunt = "Restraunt",
  Groceries = "Groceries",
}

export enum ShopStatus {
  Active = "Active",
  Upcoming = "Upcoming",
  InActive = "InActive",
}

export interface Shop {
  id: number;
  ratings: number;
  displayName: string;
  logo: string;
  address: string;
  category: ShopCategory;
  status: ShopStatus;
}

export interface ShopWithFees {
  id: number;
  displayName: string;
  logo: string;
  address: string;
  totalFees: number;
}

export type RegisterShopBody = {
  displayName: string;
  address: string;
  taxNumber: string;
  category: ShopCategory;
  shopFront?: File | null;
  logo?: File;
}

export type UpdateShopBody = Partial<RegisterShopBody>;