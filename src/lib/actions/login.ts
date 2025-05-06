'use server'

import { RoutePath } from '@/enums/RoutePath'
import { AuthFormState, Authorization } from '@/models/auth'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect, RedirectType } from 'next/navigation'
import { accessTokenKey, jwtCookieProps } from '@/constants/general'
import { loginSchema, registerSchema } from '@/constants/schema'
import { AUTH_QUERY_KEYS } from '@/lib/api/auth/authKeys'
import { apiClient } from '../axios'

const { AUTH, LOGIN, REGISTER, USER } = AUTH_QUERY_KEYS

export const loginAction = async (
  redirectTo: string | null,
  _: AuthFormState | null,
  formData: FormData
): Promise<AuthFormState | null> => {
  const parsed = loginSchema.safeParse({
    usernameOrEmail: formData.get('usernameOrEmail') ?? '',
    password: formData.get('password') ?? '',
  })

  if (!parsed.success) {
    return {
      error: parsed.error.errors[0]?.message || undefined,
      success: false,
    }
  }


  try {
    const response = await apiClient.patch<Authorization>(`/${AUTH}/${LOGIN}`, parsed.data)
    
    if (response.status !== 200) {
      return {
        error: "Failed to login",
        success: false,
      }
    }

    if (!response.data) {
      return {
        error: 'Missing data',
        success: false,
      }
    }

    await parseAndSetCookieAfterAuth(response.data)
    revalidatePath(redirectTo ?? RoutePath.Dashboard)
  } catch (_) {
    return {
      error: `Failed to login user`,
      success: false,
    }
  }

  redirect(redirectTo ?? RoutePath.Dashboard, RedirectType.replace)
}

export const parseAndSetCookieAfterAuth = async (data: Authorization): Promise<void> => {
  const { accessToken } = data
  await Promise.all([
    setCookie({
      name: accessTokenKey,
      value: accessToken,
    }),
    // TODO: set referesh token
  ])
}

export const setCookie = async ({ name, value }: { name: string; value: string }) => {
  const cookieStore = await cookies()
  cookieStore.set(name, value, jwtCookieProps)
}

export const registerAction = async (
  redirectTo: string | null,
  _: AuthFormState | null,
  formData: FormData
): Promise<AuthFormState | null> => {
  const parsed = registerSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    region: formData.get('region'),
    role: formData.get('role'),
    referralCode: formData.get('referralCode')
  });

  if (!parsed.success) {
    return {
      error: parsed.error.errors[0]?.message || undefined,
      success: false,
    }
  }

  try {
    const response = await apiClient.post<Authorization>(`/${AUTH}/${USER}/${REGISTER}`, parsed.data)
    if (response.status !== 201) {
      return {
        error: "Failed to register",
        success: false,
      }
    }

    if (!response.data) {
      return {
        error: 'Missing data',
        success: false,
      }
    }

    await parseAndSetCookieAfterAuth(response.data)
    revalidatePath(RoutePath.VerifyEmail)
  } catch (e) {
    console.log(e)
    return {
      error: `Failed to register user`,
      success: false,
    }
  }

  redirect(RoutePath.VerifyEmail, RedirectType.replace)
}

