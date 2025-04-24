import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { startTransition } from 'react'
import { jwtDecode } from "jwt-decode";
import { VersionedTransaction } from '@solana/web3.js'
import { SupportedRegion } from './types';

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
  }catch (_) {
    return false
  }
}

export const addTwitter = (twitterHandle: string) => {
  return `https://x.com/${twitterHandle}`
}


export function decodeBs64(encodedString: string) {
  return Buffer.from(encodedString, 'base64')
}

export function versionedTransactionFromBs64(encodedString: string) {
  return VersionedTransaction.deserialize(decodeBs64(encodedString))
}


export function getVpaTypeFromRegion(region: SupportedRegion) {
  switch(region){
    case SupportedRegion.EU : return {type: "IBAN", placeholder: 'HB809******08'};
    case SupportedRegion.IN : return {type: "UPI", placeholder: '887**@ibl'};
    case SupportedRegion.BR : return {type: "PIX", placeholder: 'nubank@thalesog.com'};
    case SupportedRegion.SG : return {type: "SGQR", placeholder: ''};
  }
}