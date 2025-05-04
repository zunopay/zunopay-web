import { PAYMENT_QUERY_KEYS } from "@/lib/api/payment/keys";
import { USER_QUERY_KEYS } from "@/lib/api/user/keys";

export const userKeys = Object.freeze({
    getBalance: () => [
      USER_QUERY_KEYS.USER,
      USER_QUERY_KEYS.GET,
      USER_QUERY_KEYS.BALANCE,
    ],
    getRewardPoints: () => [
      USER_QUERY_KEYS.USER,
      USER_QUERY_KEYS.GET,
      USER_QUERY_KEYS.REWARD_POINTS,
    ],
    getMe: () => [
      USER_QUERY_KEYS.USER,
      USER_QUERY_KEYS.GET,
      USER_QUERY_KEYS.ME,
    ],
    getReceiver: () => [
      PAYMENT_QUERY_KEYS.PAYMENT,
      PAYMENT_QUERY_KEYS.GET,
      PAYMENT_QUERY_KEYS.RECEIVER,
    ],
  })
  