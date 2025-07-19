import {createContext, useContext} from "react";

export const ErrorContext = createContext<string | null>(null);
export const SetErrorContext =
    createContext<(error: string | null) => void>(() => {
    });

export const useSetErrorContext = () => useContext(SetErrorContext);