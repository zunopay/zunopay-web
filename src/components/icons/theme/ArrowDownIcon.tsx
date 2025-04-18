
import { VariantSvgIconProps } from '@/lib/types'
import React from 'react'

export const ArrowDownIcon = React.forwardRef<SVGSVGElement, VariantSvgIconProps>(({ solid = false, className }, ref) => {
  return (
    <svg
      ref={ref}
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 21 20'
      fill={solid ? 'currentColor' : 'none'}
    >
        <path
          d='M5.70403 7.29289C6.09455 6.90237 6.72772 6.90237 7.11824 7.29289L10.4111 10.5858L13.704 7.29289C14.0946 6.90237 14.7277 6.90237 15.1182 7.29289C15.5088 7.68342 15.5088 8.31658 15.1182 8.70711L11.1182 12.7071C10.7277 13.0976 10.0946 13.0976 9.70403 12.7071L5.70403 8.70711C5.3135 8.31658 5.3135 7.68342 5.70403 7.29289Z'
          fill='currentColor'
        />
    </svg>
  )
})

ArrowDownIcon.displayName = 'ArrowDownIcon'
