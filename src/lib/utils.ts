import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { startTransition } from 'react'


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
