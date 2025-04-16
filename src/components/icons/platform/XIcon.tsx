import { VariantSvgIconProps } from '@/lib/types'
import React from 'react'

export const XIcon = React.forwardRef<SVGSVGElement, VariantSvgIconProps>(({ solid = false, className }, ref) => {
  return (
    <svg
      ref={ref}
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 33 32'
      fill={solid ? 'currentColor' : 'none'}
    >
        <path
         d='M23.4015 5.65689H27.0816L19.0415 14.6934L28.5 26.9902H21.0941L15.2935 19.5324L8.65631 26.9902H4.97392L13.5736 17.3246L4.5 5.65689H12.0939L17.3372 12.4737L23.4015 5.65689ZM22.1097 24.8241H24.1491L10.9859 7.70926H8.7976L22.1097 24.8241Z'
          fill='currentColor'
        />
    </svg>
  )
})

XIcon.displayName = 'XIcon'
