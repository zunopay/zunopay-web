import Image from "next/image";
import React from "react";
import ZUNOPAY_SHORT_LOGO  from '../../../../public/logo.png';
import { Text } from "@/components/ui";

export const LogoWithText: React.FC<unknown> = () => {
    return (
        <div className="flex gap-2 items-center justify-center">
         <Image src={ZUNOPAY_SHORT_LOGO} alt='ZunoPay' height={64} />
         <Text as='h2' styleVariant='secondary-heading'>Zuno<span className='font-extrabold'>Pay</span></Text>
        </div>
    )
}