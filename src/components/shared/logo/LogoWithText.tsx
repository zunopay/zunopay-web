import Image from "next/image";
import React from "react";
import ZUNOPAY_SHORT_LOGO  from '../../../../public/logo.png';
import { Text } from "@/components/ui";

export const LogoWithText: React.FC<unknown> = () => {
    return (
        <div className="flex gap-5 items-center">
         <Image src={ZUNOPAY_SHORT_LOGO} alt='ZunoPay' height={40} />
         <Text as='h2' styleVariant='primary-heading'>ZunoPay</Text>
        </div>
    )
}