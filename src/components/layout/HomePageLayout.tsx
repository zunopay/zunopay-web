import React from 'react'
import { cn } from '@/lib/utils'
import { Text } from '../ui';
import Image from 'next/image';
import SHORT_LOGO from '../../../public/Images/short-logo.png';
import { XIcon } from 'components/icons/platform/XIcon'

type Props = React.PropsWithChildren & { mainClassName?: string; showFooter?: boolean; backgroundImageSrc?: string }

export const HomePageLayout: React.FC<Props> = ({
  children,
  mainClassName,
}) => {

  return (
      <main
        className={cn(
          'flex flex-col min-w-screen min-h-screen p-10 justify-between bg-gradient-to-tl from-blue-600 to-blue-700',
          mainClassName
        )}
      >
        <div className='flex justify-center w-full'>
        <Image src={SHORT_LOGO} alt='zunopay' />
      </div>
        {children}
        <div className='flex gap-2 justify-center items-center'>
            <XIcon className='size-8' />
            <Text as='h5' styleVariant='body-small'>@ZunoPay</Text>
        </div>
      </main>
  )
}
