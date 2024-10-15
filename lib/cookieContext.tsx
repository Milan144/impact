"use client";

import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

interface CookieContextType {
    cookie: string;
}

export const CookieContext = createContext<CookieContextType | null>(null);

export const useCookies = (): CookieContextType => {
    const context = useContext(CookieContext);
    if (!context) {
        throw new Error('useCookies must be used within a CookieProvider');
    }
    return context;
};

export const CookieProvider = ({ children, cookie }: PropsWithChildren<{ cookie: string }>) => {
    const providerValue = useMemo(() => ({ cookie }), [cookie]);

    return (
        <CookieContext.Provider value={providerValue as CookieContextType}>
            {children}
        </CookieContext.Provider>
    );
};
