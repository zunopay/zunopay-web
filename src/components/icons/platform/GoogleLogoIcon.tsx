import React from 'react'
import { SvgIconProps } from '@/lib/types'

export const GoogleLogoIcon = React.forwardRef<SVGSVGElement, SvgIconProps>(({ className }, ref) => (
  <svg ref={ref} className={className} viewBox='0 0 21 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <mask id='mask0_4228_14601' style={{ maskType: 'luminance' }} maskUnits='userSpaceOnUse' x='0' y='0'>
      <path d='M20.5 0H0.5V20H20.5V0Z' fill='white' />
    </mask>
    <g mask='url(#mask0_4228_14601)'>
      <path
        d='M20.1 10.2273C20.1 9.51816 20.0364 8.83636 19.9182 8.18176H10.5V12.05H15.8818C15.65 13.3 14.9455 14.3591 13.8864 15.0682V17.5773H17.1182C19.0091 15.8364 20.1 13.2727 20.1 10.2273Z'
        fill='#4285F4'
      />
      <path
        d='M10.4999 20C13.1999 20 15.4635 19.1045 17.1181 17.5773L13.8862 15.0682C12.9908 15.6682 11.8453 16.0227 10.4999 16.0227C7.89528 16.0227 5.69078 14.2636 4.90438 11.9H1.56348V14.4909C3.20898 17.7591 6.59078 20 10.4999 20Z'
        fill='#34A853'
      />
      <path
        d='M4.9045 11.9001C4.7045 11.3001 4.5909 10.6592 4.5909 10.0001C4.5909 9.34096 4.7045 8.70006 4.9045 8.10006V5.50916H1.5636C0.886401 6.85916 0.5 8.38646 0.5 10.0001C0.5 11.6137 0.886401 13.141 1.5636 14.491L4.9045 11.9001Z'
        fill='#FBBC04'
      />
      <path
        d='M10.4999 3.9773C11.9681 3.9773 13.2862 4.4818 14.3226 5.4727L17.1908 2.6045C15.459 0.9909 13.1953 0 10.4999 0C6.59078 0 3.20898 2.2409 1.56348 5.5091L4.90438 8.1C5.69078 5.7364 7.89528 3.9773 10.4999 3.9773Z'
        fill='#E94235'
      />
    </g>
  </svg>
))

GoogleLogoIcon.displayName = 'GoogleLogoIcon'
