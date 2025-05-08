import { Merchant, MerchantCategory, MerchantStatus } from "@/models/merchant";

export const UPCOMING_MERCHANTS : Merchant[] = [
    {
        id: 2,
        displayName: "6 Slice Pizza",
        address: "L 49B, Jamia Nagar New Delhi, India",
        logo: "6_slice.png",
        status: MerchantStatus.Upcoming,
        category: MerchantCategory.Restraunt
    },
    {
        id: 3,
        displayName: "Sushi&Wine Transformart Bar",
        address: "Svetog Save 8, Beograd 11000, Serbia",
        logo: "sushu_wine_bar.png",
        status: MerchantStatus.Upcoming,
        category: MerchantCategory.Restraunt
    }
]