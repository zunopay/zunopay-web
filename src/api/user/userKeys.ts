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
  })
  