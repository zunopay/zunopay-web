'use server'

import { accessTokenKey, jwtCookieProps } from "@/constants/general"
import { Authorization } from "@/models/auth"
import { cookies } from "next/headers"

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