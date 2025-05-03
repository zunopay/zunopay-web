import React from "react";
import { Text } from "@/components/ui";
import {LogoIcon} from '@/components/icons/platform/LogoIcon'

export const LogoWithText: React.FC<unknown> = () => {
    return (
        <div className="flex gap-4 items-center justify-center">
         <LogoIcon className="w-11 h-11"/>
         <Text as='h2' styleVariant='secondary-heading'>Zuno<span className='font-extrabold'>Pay</span></Text>
        </div>
    )
}