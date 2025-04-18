import Link from 'next/link'
import { Text, Variant } from '../ui/Text'
import { cn } from '@/lib/utils'
import React from 'react'
import { SidebarMenuButton } from '../ui/sidebar'
import { VariantSvgIconProps } from '@/lib/types'

export type NavigationLinkProps = {
  href: string
  activeColor?: string
  isComingSoon?: boolean
  disabled?: boolean
  as?: Variant
  title: string
  isActive: boolean
  Icon: React.FC<VariantSvgIconProps>
  className?: string
}

export const SidebarMenuLink: React.FC<NavigationLinkProps> = ({ href, isActive, title, disabled = false, Icon, className }) => {
  return (
    <SidebarMenuButton asChild>
      <Link
        className={cn(
          'flex flex-row text-white',
          className,
          isActive && 'bg-active-gradient',
        )}
        href={disabled ? '#' : href}
      >
        <Icon />
        <Text styleVariant='body-normal' fontWeight='medium' as='span'>
          {title}
        </Text>
      </Link>
    </SidebarMenuButton>
  )
}
