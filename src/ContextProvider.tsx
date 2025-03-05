import { createContext, useState, ReactNode } from "react";

export const Context = createContext<{ 
        reload: () => void;
        setShowEdit: (show: boolean) => void;
        showEdit: boolean;
    }>({ 
        reload: () => {},
        setShowEdit: () => {},
        showEdit: false
    });

export const ContextProvider = ({ children }: { children: ReactNode }) => {
    const [key, setKey] = useState(0);
    const [showEdit, setShowEdit] = useState(false);

    const reload = () => {
        setKey(prevKey => prevKey + 1);
    };

    return (
        <Context.Provider value={{ reload, setShowEdit, showEdit }}>
            <div key={key}>{children}</div>
        </Context.Provider>
    );
};