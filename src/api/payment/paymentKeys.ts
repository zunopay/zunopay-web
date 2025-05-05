import { PAYMENT_QUERY_KEYS } from "@/lib/api/payment/keys";

export const paymentKeys = Object.freeze({
    getReceiver: () => [
      PAYMENT_QUERY_KEYS.PAYMENT,
      PAYMENT_QUERY_KEYS.GET,
      PAYMENT_QUERY_KEYS.RECEIVER,
    ],
  })
  