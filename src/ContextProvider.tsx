import { createContext, useState, ReactNode } from "react";

export const Context = createContext<{ reload: () => void }>({ reload: () => {} });

export const ContextProvider = ({ children }: { children: ReactNode }) => {
    const [key, setKey] = useState(0);

    const reload = () => {
        setKey(prevKey => prevKey + 1);
    };

    return (
        <Context.Provider value={{ reload }}>
            <div key={key}>{children}</div>
        </Context.Provider>
    );
};