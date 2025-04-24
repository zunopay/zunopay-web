import { NextRequest, NextResponse } from 'next/server'
import { RoutePath } from './enums/RoutePath'
import { accessTokenKey, REDIRECT_TO_KEY } from './constants/general'
import { isTokenValid } from './lib/utils'

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function middleware(request: NextRequest) {
  const requestUrlPath = request.nextUrl.pathname
  const isAuthenticatedUser = isTokenValid(request.cookies.get(accessTokenKey)?.value ?? '')
  
  if (authRoutesRegex.test(requestUrlPath)) {
    if (!isAuthenticatedUser) {
      return await handleUnauthorized({
        path: requestUrlPath,
        url: request.url,
      })
    }
  }

  if (requestUrlPath.includes(RoutePath.Login) && isAuthenticatedUser) {
    const redirectTo = request.nextUrl.searchParams.get(REDIRECT_TO_KEY)
    return NextResponse.redirect(new URL(redirectTo ?? RoutePath.Home, request.url))
  }

  // Handle preflighted requests
  const isPreflight = request.method === 'OPTIONS'

  if (isPreflight) {
    const preflightHeaders = corsOptions
    return NextResponse.json({}, { headers: preflightHeaders })
  }

  // Handle simple requests
  const response = NextResponse.next()
  response.headers.set("x-pathname", request.nextUrl.pathname);

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

export const config = {
  matcher: [
    '/register',
    '/register/:path*',
    '/dashboard/:path*',
    '/api/:path*',
    '/login/:path*',
  ],
}

const authRoutesRegex = /^(\/(dashboard|profile|settings)(\/.*)?|\/register\/verify-email)$/

const handleUnauthorized = async ({ path, url }: { path: string; url: string }) => {
  const updatedUrl = new URL(RoutePath.Login, url)
  updatedUrl.searchParams.append(REDIRECT_TO_KEY, path)
  return NextResponse.redirect(updatedUrl)
}
