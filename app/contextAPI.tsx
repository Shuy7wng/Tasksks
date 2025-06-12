"use client";

import { ReactNode, createContext, useContext, useState} from "react";

interface GlobalContext{
  isDark:boolean;
  setIsDark:(isDark:boolean)=>void;
}
const GlobalContext = createContext<GlobalContext>({
  isDark:false,
  setIsDark:()=>{},
});

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(false);

  return (
    <GlobalContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContextProvider() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContextProvider must be used within a GlobalContextProvider"
    );
  }
  return context;
}
