export const USER_QUERY_KEYS = Object.freeze({
    USER: 'user',
    GET: 'get',
    ME: 'me',
    VERIFY_EMAIL:'verify-email',
    BALANCE: 'balance'
})

export const userKeys = Object.freeze({
    getBalance: () => [
      USER_QUERY_KEYS.USER,
      USER_QUERY_KEYS.GET,
      USER_QUERY_KEYS.BALANCE,
    ],
  })
  