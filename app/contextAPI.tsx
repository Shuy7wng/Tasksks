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

interface DropDownPosition {
  x: number;
  y: number;
}

interface MenuItem {
  name: string;
  icon: any;
  isSelected: boolean;
}

interface Task {
  id: number;
  name: string;
  priority: string;
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
    openNewCategorieBox: boolean;
    setOpenNewCategorieBox: (openNewCategorieBox: boolean) => void;
    refreshProjects: boolean;
    setRefreshProjects: Dispatch<SetStateAction<boolean>>;
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

  categorie: {
    list: string[];
    setList: Dispatch<SetStateAction<string[]>>;
  };

  tasksContext: {
    tasks: Task[];
    setTasks: Dispatch<SetStateAction<Task[]>>;
    fetchTasks: (projectId: number) => Promise<void>;
  };
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);
  const [refreshProjects, setRefreshProjects] = useState<boolean>(false);

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { name: "Home", icon: faDashboard, isSelected: true },
    { name: "Progetti", icon: faBarsProgress, isSelected: false },
    { name: "Categorie", icon: faLayerGroup, isSelected: false },
  ]);

  const [openNewProjectBox, setOpenNewProjectBox] = useState(false);
  const [openNewCategorieBox, setOpenNewCategorieBox] = useState(false);
  const [openIconBox, setOpenIconBox] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [dropDownPosition, setDropDownPosition] = useState<DropDownPosition>({
    x: 0,
    y: 0,
  });
  const [openCreatedProject, setOpenCreateProject] = useState(false);
  const [openTaskWindow, setOpenTaskWindow] = useState(false);
  const [categorie, setCategorie] = useState<string[]>(["do", "to-do"]);

  const [tasks, setTasks] = useState<Task[]>([]);

  // funzione fetchTasks da usare nel context
  const fetchTasks = async (projectId: number) => {
    try {
      const res = await fetch(`/api/task?progettoId=${projectId}`);
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      } else {
        console.error("Errore fetchTasks: ", res.statusText);
      }
    } catch (error) {
      console.error("Errore fetchTasks:", error);
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    async function loadCategorie() {
      try {
        const res = await fetch("/api/categorie");
        if (res.ok) {
          const data = await res.json();
          setCategorie(data.map((cat: any) => cat.nome));
        }
      } catch (err) {
        console.error("Errore caricando categorie", err);
      }
    }
    loadCategorie();
  }, []);

  // Chiude box se cambia menu
  useEffect(() => {
    if (
      openNewProjectBox ||
      openIconBox ||
      openDropDown ||
      openCreatedProject ||
      openTaskWindow ||
      openNewCategorieBox
    ) {
      setOpenNewProjectBox(false);
      setOpenIconBox(false);
      setOpenDropDown(false);
      setOpenCreateProject(false);
      setOpenTaskWindow(false);
      setOpenNewCategorieBox(false);
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
          openNewCategorieBox,
          setOpenNewCategorieBox,
          refreshProjects,
          setRefreshProjects,
        },
        
        iconBox: { openIconBox, setOpenIconBox },
        dropDown: {
          openDropDown,
          setOpenDropDown,
          dropDownPosition,
          setDropDownPosition,
        },
        categorie: {
          list: categorie,
          setList: setCategorie,
        },
        tasksContext: {
          tasks,
          setTasks,
          fetchTasks,
        },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContextProvider() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContextProvider deve essere usato dentro <GlobalContextProvider>"
    );
  }
  return context;
}
