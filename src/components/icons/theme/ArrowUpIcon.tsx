import { VariantSvgIconProps } from '@/lib/types'
import React from 'react'

export const ArrowUpIcon = React.forwardRef<SVGSVGElement, VariantSvgIconProps>(({ solid = false, className }, ref) => {
  return (
    <svg
      ref={ref}
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
      fill={solid ? 'currentColor' : 'none'}
    >
        <path
          d='M5.29289 12.7071C5.68342 13.0976 6.31658 13.0976 6.70711 12.7071L10 9.41421L13.2929 12.7071C13.6834 13.0976 14.3166 13.0976 14.7071 12.7071C15.0976 12.3166 15.0976 11.6834 14.7071 11.2929L10.7071 7.29289C10.3166 6.90237 9.68342 6.90237 9.29289 7.29289L5.29289 11.2929C4.90237 11.6834 4.90237 12.3166 5.29289 12.7071Z'
          fill='currentColor'
        />
    </svg>
  )
})

ArrowUpIcon.displayName = 'ArrowUpIcon'
