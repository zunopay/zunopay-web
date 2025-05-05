import { MERCHANT_QUERY_KEYS } from "@/lib/api/merchant/keys";

export const merchantKeys = Object.freeze({
    getMerchants: () => [
      MERCHANT_QUERY_KEYS.MERCHANT,
      MERCHANT_QUERY_KEYS.GET,
    ],
  })
  