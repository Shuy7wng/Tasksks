"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface GlobalContextType {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

const GlobalContext = createContext<GlobalContextType>({
  isDark: false,
  setIsDark: () => {},
});

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  // Aggiunge / rimuove la classe "dark" sull'html per tailwind
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <GlobalContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContextProvider() {
  return useContext(GlobalContext);
}
