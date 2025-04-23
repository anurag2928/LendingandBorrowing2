import React, { createContext, useContext, useState } from 'react';

interface WalletContextType {
    account: string | null;
    setAccount: React.Dispatch<React.SetStateAction<string | null>>;
}

const WalletContext = createContext<WalletContextType | null>(null);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
    const [account, setAccount] = useState<string | null>(null);

    return (
        <WalletContext.Provider value={{ account, setAccount }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};