import { generateMaxLengthErrorMessage, generateMinLengthErrorMessage } from './error'
import { z } from 'zod'

export const USERNAME_REGEX = new RegExp(/^[a-zA-Z0-9-_čćžšđČĆŽŠĐ]+$/)
// export const PASSWORD_REGEX = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
export const PASSWORD_LOWERCASE_REGEX = new RegExp(/^(?=.*[a-z]).+$/)
export const PASSWORD_UPPERCASE_REGEX = new RegExp(/^(?=.*[A-Z]).+$/)
export const PASSWORD_DIGIT_REGEX = new RegExp(/^(?=.*\d).+$/)

const zUsername = z
  .string()
  .min(3, generateMinLengthErrorMessage('Username', 3))
  .max(20, generateMaxLengthErrorMessage('Username', 20))
  .regex(USERNAME_REGEX, 'Only A-Z, 0-9, underscore, and hypen are allowed')

const zDisplayName = z
.string()
.min(2, generateMinLengthErrorMessage('Display name', 2))
.max(40, generateMaxLengthErrorMessage('Display name', 40))

// TODO: add more checks
const zVpa = z
  .string();

  //TODO: Use only supported regions
const zRegion = z
  .string();

const zString = z.string();

const zRole = z
  .enum(['Individual', 'Merchant']);

const zEmail = z.string().email()
const zPassword = z
  .string()
  .min(8, generateMinLengthErrorMessage('Password', 8))
  .regex(PASSWORD_LOWERCASE_REGEX, 'Password should include a lowercase character')
  .regex(PASSWORD_UPPERCASE_REGEX, 'Password should include an uppercase character')
  .regex(PASSWORD_DIGIT_REGEX, 'Password should include a number')

export const loginSchema = z.object({
  usernameOrEmail: z.string(),
  password: z.string(),
})

export const registerSchema = z.object({
    username: zUsername,
    email: zEmail,
    password: zPassword,
    region: zRegion,
    role: zRole,
    referralCode: zString
})

export const startKycSchema = z.object({
  vpa: zVpa
})