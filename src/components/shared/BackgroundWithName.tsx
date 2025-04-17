import React from 'react'

export const BackgroundWithName: React.FC<unknown> = () => (
  <>
    <div className="-z-10 fixed inset-0 hidden md:flex items-center justify-center overflow-hidden pointer-events-none">
      <h1 className="text-[26vw] font-extrabold text-white opacity-10 select-none font-satoshi text-outline"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1),rgba(0,0,0,0.7), rgba(0,0,0,0.01))',
          WebkitMaskSize: '100%',
          WebkitMaskPosition: '0% 0%',
          WebkitTextStroke: '3px white'
        }}
      >
        <span className='font-medium'>Zuno</span>Pay
      </h1>
    </div>

  <div className="-z-10 fixed inset-0 md:hidden flex items-center justify-start overflow-hidden pointer-events-none">
    <h1
      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[42%] rotate-90 text-[46vw] font-extrabold text-white opacity-5 select-none font-satoshi text-outline"
      style={{
        WebkitMaskImage:
          'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.01))',
        WebkitMaskSize: '100%',
        WebkitMaskPosition: '0% 0%',
        WebkitTextStroke: '2px white'
      }}
    >
      <span className="font-medium">Zuno</span>Pay
    </h1>

    <h1
      className="-z-10 absolute right-0 top-1/2 -translate-y-1/2 translate-x-[42%] -rotate-90 text-[46vw] font-extrabold text-white opacity-5 select-none font-satoshi text-outline"
      style={{
        WebkitMaskImage:
          'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.01))',
        WebkitMaskSize: '100%',
        WebkitMaskPosition: '0% 0%',
        WebkitTextStroke: '2px white'
      }}
    >
      <span className="font-medium">Zuno</span>Pay
    </h1>
  </div>


  </>
)
