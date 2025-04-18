'use server'

import { RoutePath } from '@/enums/RoutePath'
import { AuthFormState, Authorization } from '@/models/auth'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect, RedirectType } from 'next/navigation'
import { accessTokenKey, jwtCookieProps } from '@/constants/general'
import { createMerchantProfileSchema, loginSchema, registerSchema } from '@/constants/schema'
import { AUTH_QUERY_KEYS } from '@/api/auth/authKeys'
import { apiClient } from '../axios'
import { Role } from '../types'
import { Merchant } from '@/models/merchant'
import http from '@/api/http'

const { AUTH, LOGIN, REGISTER, USER, MERCHANT } = AUTH_QUERY_KEYS

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
      error: `Please provide valid data`,
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
    revalidatePath(RoutePath.Login)
  } catch (_) {
    return {
      error: `Failed to login user`,
      success: false,
    }
  }

  redirect(redirectTo ?? RoutePath.Home, RedirectType.replace)
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
  let redirectPath = redirectTo;

  const parsed = registerSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    region: formData.get('region'),
    role: formData.get('role')
  });

  if (!parsed.success) {
    return {
      error: `Please provide valid data`,
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
    const role = parsed.data.role;
    //TODO: Redirect individuals and verifiers to respective path.
    redirectPath = role == Role.Merchant ? RoutePath.CreateMerchantProfile : RoutePath.Home;
    revalidatePath(redirectPath)
  } catch (_) {
    return {
      error: `Failed to register user`,
      success: false,
    }
  }

  redirect(redirectPath ?? RoutePath.Home, RedirectType.replace)
}

export async function createMerchantProfileAction(_: AuthFormState | null, formData: FormData) {
  const parsed = createMerchantProfileSchema.safeParse({
    displayName: formData.get("displayName") ?? '',
    vpa: formData.get('vpa') ?? ''
  });


 if (!parsed.success) {
    return {
      error: `Please provide valid data`,
      success: false,
    }
  }

  try {
    const response = await http.post<Merchant>(`/${AUTH}/${MERCHANT}/${REGISTER}`, parsed.data)
    if (!response.data) {
      return {
        error: 'Missing data',
        success: false,
      }
    }

    revalidatePath(RoutePath.Dashboard)
  } catch (_) {
    return {
      error: `Failed to create merchant profile`,
      success: false,
    }
  }

  redirect(RoutePath.Dashboard, RedirectType.replace)
}