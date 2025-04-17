'use client'

import { Button } from '../../ui/Button'
import { signIn } from 'next-auth/react'
import { GoogleLogoIcon } from '@/components/icons/platform/GoogleLogoIcon'

type Props = {
  buttonText?: string
  onClick?: () => void
} & Pick<React.HTMLAttributes<HTMLButtonElement>, 'className'>

export const GoogleSignInButton: React.FC<Props> = ({ buttonText = 'Sign in with google', className, onClick }) => {
  const isWebView = () => {
    const ua = navigator.userAgent.toLowerCase()
    return (
      ua.includes('wv') ||
      ua.includes('webview') ||
      (((ua.includes('iphone') || ua.includes('ipad')) && !ua.includes('safari')) ||
        (ua.includes('android') && ua.includes('version/'))) 
    )
  }
  const handleSignIn = (providerId: string) => {
    if (isWebView()) {
      const authUrl = `/api/auth/signin/${providerId}?callbackUrl=${encodeURIComponent(window.location.origin)}`
      window.open(authUrl, '_blank')
    } else {
      signIn(providerId)
    }
  }

  return (
    <Button
      Icon={GoogleLogoIcon}
      onClick={() => {
        onClick?.()
        handleSignIn('google')
      }}
      type='button'
      size='lg'
      className={className}
    >
      {buttonText}
    </Button>
  )
}
