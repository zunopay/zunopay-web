'use client'

import { PrivyProvider } from "@privy-io/react-auth";
import { ReactNode } from "react";

interface PrivyContextProviderProps {
    children: ReactNode;
    appId: string;
}

export const PrivyContextProvider = ({children, appId } : PrivyContextProviderProps) => {
    return (
        <PrivyProvider
            appId={appId}
            config={{
            appearance: {
                theme: 'light',
                accentColor: '#676FFF',
                logo: '../../logo.png'
            },
            }}>
            {children}
        </PrivyProvider>
    )
}

