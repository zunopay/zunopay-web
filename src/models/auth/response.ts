
export interface Authorization {
    accessToken: string
    // refreshToken: string
  }
  
  export type JwtPayload<T> = T & {
    iat: number
    exp: number
  }
  