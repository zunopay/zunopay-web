import { Merchant, MerchantCategory, MerchantStatus } from "@/models/merchant";

export const UPCOMING_MERCHANTS : Merchant[] = [
    {
        id: 1,
        displayName: "Sushi&Wine Transformart Bar",
        address: "Svetog Save 8, Beograd 11000, Serbia",
        logo: "transform_art_bar.png",
        ratings: 4.5,
        status: MerchantStatus.Upcoming,
        category: MerchantCategory.Restraunt,
    },
    {
        id: 2,
        displayName: "6 Slice Pizza",
        address: "L 49B, Jamia Nagar New Delhi, India",
        logo: "6_slice.png",
        status: MerchantStatus.Upcoming,
        category: MerchantCategory.Restraunt,
        ratings: 4
    },
    {
        id: 3,
        displayName: "Chozen",
        address: "Remetinec 48e, Zagreb,Proizvodnja kakao, čokoladnih i bombonskih proizvoda",
        logo: "chozen.png",
        status: MerchantStatus.Upcoming,
        category: MerchantCategory.Restraunt,
        ratings: 4.5
    },
    {
        id: 4,
        displayName: "Nel Fruits",
        address: "Remote",
        ratings: 4,
        logo: "nel_fruits.png",
        status: MerchantStatus.Upcoming,
        category: MerchantCategory.Groceries
    },
    {
        id: 5,
        displayName: "High Castle Books",
        address: "Bišćanov put 6, Zagreb",
        ratings: 4,
        logo: "high_castle_book.png",
        status: MerchantStatus.Upcoming,
        category: MerchantCategory.Groceries
    },
    {
        id: 6,
        displayName: "If I Can",
        address: "Bišćanov put 6, Zagreb",
        ratings: 4,
        logo: "if_i_can.png",
        status: MerchantStatus.Upcoming,
        category: MerchantCategory.Restraunt
    },
    {
        id: 7,
        displayName: "Vape Shop",
        address: "Bišćanov put 6, Zagreb",
        ratings: 4,
        logo: "vape_shop.png",
        status: MerchantStatus.Upcoming,
        category: MerchantCategory.Restraunt
    },
    
]