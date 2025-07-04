export * from './response';

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