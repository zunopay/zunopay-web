
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


// image aspect ratios
export const ASPECT_RATIO = Object.freeze({
    COMIC_COVER: { width: 900, height: 1000 },
    COMIC_BANNER: { width: 1920, height: 900 },
    COMIC_ISSUE_COVER: { width: 1024, height: 1484 },
    CREATOR_BANNER: { width: 1920, height: 900 },
    CREATOR_AVATAR: { width: 500, height: 500 },
  })