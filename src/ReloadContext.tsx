import { createContext, useState, ReactNode } from "react";

export const ReloadContext = createContext<{ reload: () => void }>({ reload: () => {} });

export const ReloadProvider = ({ children }: { children: ReactNode }) => {
    const [key, setKey] = useState(0);

    const reload = () => {
        setKey(prevKey => prevKey + 1);
    };

    return (
        <ReloadContext.Provider value={{ reload }}>
            <div key={key}>{children}</div>
        </ReloadContext.Provider>
    );
};