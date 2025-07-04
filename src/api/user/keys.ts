export const USER_QUERY_KEYS = Object.freeze({
  USER: 'user',
  GET: 'get',
  ME: 'me',
  VERIFY_EMAIL:'verify-email',
  BALANCE: 'balance',
  REWARD_POINTS: 'reward-points',
  ROYALTY_EARNED: 'royalty-earned',
  GET_MERCHANT: 'get-merchant',
  MERCHANT_PROFILE: 'merchant-profile'
})

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
    getRoyaltyEarned: () => [
      USER_QUERY_KEYS.USER,
      USER_QUERY_KEYS.GET,
      USER_QUERY_KEYS.ROYALTY_EARNED,
    ],
    getMerchants: () => [
      USER_QUERY_KEYS.USER,
      USER_QUERY_KEYS.GET_MERCHANT,
    ],
    getMerchant: (slug: string) => [
      USER_QUERY_KEYS.USER,
      USER_QUERY_KEYS.GET_MERCHANT,
      slug
    ],
  })
  