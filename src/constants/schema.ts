import { ShopCategory } from '@/models/shop'
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

const zImage = z
  .any()
  .optional()
  .refine((file) => file === undefined || (file !== null && file !== ''), {
    message: 'Invalid image',
  });

const zString = z.string();
const zCategory = z.enum([ShopCategory.Groceries, ShopCategory.Restraunt])
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
    referralCode: zString
})

export const shopRegisterSchema = z.object({
  displayName: zDisplayName,
  address: zString,
  taxNumber: zString,
  category: zCategory,
  logo: zImage,
  shopFront: zImage
})
