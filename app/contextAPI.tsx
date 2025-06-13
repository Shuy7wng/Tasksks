"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface GlobalContextType {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
  sideBar:{
    openSideBar:boolean;
    setOpenSideBar:(openSideBar:boolean)=> void;
  }
}

const GlobalContext = createContext<GlobalContextType>({
  isDark: false,
  setIsDark: () => {},
  sideBar:{
    openSideBar: false,
    setOpenSideBar:()=>{},
  }
});

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);

  // Aggiunge / rimuove la classe "dark" sull'html per tailwind
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <GlobalContext.Provider 
  value={{ 
    isDark, 
    setIsDark, 
    sideBar: { openSideBar, setOpenSideBar } 
  }}>
  {children}
</GlobalContext.Provider>
  );
}

export function useGlobalContextProvider() {
  return useContext(GlobalContext);
}
