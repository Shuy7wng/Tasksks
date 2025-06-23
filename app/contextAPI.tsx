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

export interface DropDownPosition {
  x: number;
  y: number;
}

export interface Categoria {
  id: number;
  nome: string;
}

export interface Progetto {
  id: number | string;
  nome: string;
  categorie?: unknown[];
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
   progetti: Progetto[];
  setProgetti: Dispatch<SetStateAction<Progetto[]>>;
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
    editingProject: Progetto | null;
    setEditingProject: Dispatch<SetStateAction<Progetto | null>>;
  };

  categorie: {
    list: Categoria[];
    setList: Dispatch<SetStateAction<Categoria[]>>;
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
    selectedProject: Progetto | null;
    setSelectedProject: Dispatch<SetStateAction<Progetto | null>>;
    dropdownContent: React.ReactNode;
    setDropdownContent: Dispatch<SetStateAction<React.ReactNode>>;
  };
  tasksContext: {
    tasks: Task[];
    setTasks: Dispatch<SetStateAction<Task[]>>;
    fetchTasks: (projectId: number) => Promise<void>;
  };
   
  // Funzioni per modificare ed eliminare progetto
  editProject: (project: Progetto) => void;
  deleteProject: (projectId: number | string) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  // Stati principali
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
  const [categorie, setCategorie] = useState<Categoria[]>([]);
  const [selectedProject, setSelectedProject] = useState<Progetto | null>(null);
  const [dropdownContent, setDropdownContent] = useState<React.ReactNode>(null);
  const [editingProject, setEditingProject] = useState<Progetto | null>(null);
  const [progetti, setProgetti] = useState<Progetto[]>([]); 
  const [tasks, setTasks] = useState<Task[]>([]);

  // Funzione per modificare progetto
  function editProject(project: Progetto) {
    console.log("Modifica progetto nel context:", project);projectWindow 
    // Qui puoi aggiungere la logica per aggiornare la lista progetti,
    // oppure fare una chiamata API per salvare le modifiche
  }

async function deleteProject(projectId: number | string) {
  console.log("Elimina progetto nel context con id:", projectId);
  
  try {
    const res = await fetch(`/api/progetti?id=${projectId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Errore eliminazione progetto");
    }

    setProgetti((oldProgetti) => oldProgetti.filter(p => p.id !== projectId));
  } catch (error) {
    console.error("Errore eliminazione:", error);
    alert("Errore durante l'eliminazione del progetto.");
  }
}
  // fetchTasks da usare nel context
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
    async function loadCategorie() {
      try {
        const res = await fetch("/api/categorie");
        if (res.ok) {
          const data = await res.json();
          setCategorie(data);
        }
      } catch (err) {
        console.error("Errore caricando categorie", err);
      }
    }
    loadCategorie();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

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

  const dropDown = {
    openDropDown,
    setOpenDropDown,
    dropDownPosition,
    setDropDownPosition,
    selectedProject,
    setSelectedProject,
    dropdownContent,
    setDropdownContent,
  };
  const projectWindow = {
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
    editProject,
    setEditingProject,
  };

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
        editingProject,
        setEditingProject,
      },
        progetti,     // qui
      setProgetti,  // qui

        iconBox: { openIconBox, setOpenIconBox },
        dropDown,
        categorie: {
          list: categorie,
          setList: setCategorie,
        },
        tasksContext: {
          tasks,
          setTasks,
          fetchTasks,
        },
        editProject,
        deleteProject,
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
