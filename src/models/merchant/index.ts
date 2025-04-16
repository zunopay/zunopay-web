import { User } from "../user";

export interface Merchant {
   displayName: string;
   isKycVerified: boolean;
   user: User
}