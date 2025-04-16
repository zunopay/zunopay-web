import React from 'react'

export const BackgroundWithName: React.FC<unknown> = () => (
  <div className="-z-100 absolute inset-0 flex items-center justify-center overflow-hidden">
    <h1 className="text-[26vw] font-bold text-white opacity-5 select-none font-satoshi text-outline tracking-[-3.2px]"
  style={{
    WebkitMaskImage: 'linear-gradient(to bottom right, rgba(0,0,0,1), rgba(0,0,0,0))',
    WebkitMaskSize: '200%',
    WebkitMaskPosition: '0% 0%'
  }}
      ><span className='font-medium'>Zuno</span>Pay</h1>
  </div>
)
