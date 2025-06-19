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

// Tipo per la posizione del drop-down
interface DropDownPosition {
  x: number;
  y: number;
}

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

  projectWindow: {
    openNewProjectBox: boolean;
    setOpenNewProjectBox: (openNewProjectBox: boolean) => void;
    openCreatedProject: boolean;
    setOpenCreateProject: (openCreateProject: boolean) => void;
    openTaskWindow: boolean;
    setOpenTaskWindow: (openTaskWindow: boolean) => void;
  };

  iconBox: {
    openIconBox: boolean;
    setOpenIconBox: (openIconBox: boolean) => void;
  };

  dropDown: {
    openDropDown: boolean;
    setOpenDropDown: (openDropDown: boolean) => void;

    dropDownPosition: DropDownPosition;
    setDropDownPosition: Dispatch<SetStateAction<DropDownPosition>>;
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

  const [openNewProjectBox, setOpenNewProjectBox] = useState(false);
  const [openIconBox, setOpenIconBox] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [dropDownPosition, setDropDownPosition] = useState<DropDownPosition>({ x: 0, y: 0 });
  const [openCreatedProject, setOpenCreateProject] = useState(false);
  const [openTaskWindow, setOpenTaskWindow] = useState(false);
  // Aggiorna la classe "dark" sul root element
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // Chiude box se si cambia menu
  useEffect(() => {
    if (openNewProjectBox ||
      openIconBox ||
      openDropDown ||
      openCreatedProject||
      openTaskWindow
    ) {
      setOpenNewProjectBox(false);
      setOpenIconBox(false);
      setOpenDropDown(false);
      setOpenCreateProject(false);
      setOpenTaskWindow(false);
    }
  }, [menuItems]);

  return (
    <GlobalContext.Provider
      value={{
        isDark,
        setIsDark,
        sideBar: { openSideBar, setOpenSideBar },
        dashboardItems: { menuItems, setMenuItems },
        projectWindow: {
          openNewProjectBox,
          setOpenNewProjectBox,
          openCreatedProject,
          setOpenCreateProject,
          openTaskWindow,
          setOpenTaskWindow,
        },
        iconBox: { openIconBox, setOpenIconBox },
        dropDown: {
          openDropDown,
          setOpenDropDown,
          dropDownPosition,
          setDropDownPosition,
        },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

// Hook personalizzato per usare il contesto
export function useGlobalContextProvider() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContextProvider deve essere usato dentro <GlobalContextProvider>"
    );
  }
  return context;
}
