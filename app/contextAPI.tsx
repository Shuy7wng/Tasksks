import React, { createContext, useContext, useState, ReactNode } from "react";

// 1. Definizione del tipo per il contesto
type ContextType = {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
};

// 2. Creazione del contesto con valore iniziale
const GlobalContext = createContext<ContextType | undefined>(undefined);

// 3. Provider del contesto
export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(false); // Stato per dark/light mode

  return (
    <GlobalContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </GlobalContext.Provider>
  );
}

// 4. Hook personalizzato per usare il contesto0
export function useGlobalContextProvider() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContextProvider must be used within a GlobalContextProvider");
  }
  return context;
}