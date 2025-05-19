
export interface Authorization {
  accessToken: string
  // refreshToken: string
}

export type JwtPayload<T> = T & {
  iat: number
  exp: number
}

export type AuthFormState = {
  error?: string
  success: boolean
}

export interface LoginBody {
  usernameOrEmail: string
  password: string
}

export interface RegisterBody {
  username: string
  email: string
  password: string
  referralCode: string
}