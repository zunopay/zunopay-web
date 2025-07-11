
//  auth
export const accessTokenKey = 'access_token'
export const refreshTokenKey = 'refresh_token'
export const REDIRECT_TO_KEY = 'redirectTo'
export const ROLE_KEY = 'role'

export const jwtCookieProps = {
  httpOnly: true,
  secure: true,
  maxAge: 100 * 24 * 60 * 60,
}
export const baseApiUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT}`

// image aspect ratios
export const ASPECT_RATIO = Object.freeze({
    COMIC_COVER: { width: 900, height: 1000 },
    COMIC_BANNER: { width: 1920, height: 900 },
    COMIC_ISSUE_COVER: { width: 1024, height: 1484 },
    CREATOR_BANNER: { width: 1920, height: 900 },
    CREATOR_AVATAR: { width: 500, height: 500 },
  })

// Transfer
export const MIN_TRANSFER_AMOUNT_LIMIT = 0.001;

export const EARLY_USER_FORM = "https://docs.google.com/forms/d/e/1FAIpQLSfdp-XOdKHmSmsAVjFbr6sobLVj_QQDWd_29ScopAl5cBztPA/viewform"
export const MEMBERSHIP_FORM = "https://docs.google.com/forms/d/e/1FAIpQLSdQrS4CDhJnNY9EhlvEXPsEIu6N1dV7ZKxyz4bAJcBSP-78mQ/viewform"

export const MAX_SHOPPING_POINTS = 100;
export const MIN_SHOPPING_POINTS = 1;
export const USDC_DECIMALS = 6;
