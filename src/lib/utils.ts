import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { startTransition } from 'react'
import { jwtDecode } from "jwt-decode";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function onSubmitPreventFormListener(action: (payload: FormData) => void) {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    startTransition(() => {
      action(new FormData(event.currentTarget))
    })
  }

  return onSubmit
}

export function isTokenValid(token: string): boolean {
  try {
    const decoded = jwtDecode(token)
    const currentTime = Date.now() / 1000
    return !!decoded.exp && decoded.exp >= currentTime
  } catch (_) {
    return false
  }
}
