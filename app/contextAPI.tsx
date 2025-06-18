"use client";

import {
  faDashboard,
  faBarsProgress,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

interface MenuItem {
  name: string;
  icon: any;
  isSelected: boolean;
}

interface GlobalContextType {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
  sideBar: {
    openSideBar: boolean;
    setOpenSideBar: (open: boolean) => void;
  };
  dashboardItems: {
    menuItems: MenuItem[];
    setMenuItems: Dispatch<SetStateAction<MenuItem[]>>;
  };
}

// Contesto inizialmente undefined
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Provider
export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { name: "Home", icon: faDashboard, isSelected: true },
    { name: "Progetti", icon: faBarsProgress, isSelected: false },
    { name: "Categorie", icon: faLayerGroup, isSelected: false },
  ]);

  // Aggiorna classe dark
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <GlobalContext.Provider
      value={{
        isDark,
        setIsDark,
        sideBar: { openSideBar, setOpenSideBar },
        dashboardItems: { menuItems, setMenuItems },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

// Hook personalizzato
export function useGlobalContextProvider() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContextProvider deve essere usato dentro <GlobalContextProvider>"
    );
  }
  return context;
}
