"use client";

import { faDashboard, faBarsProgress, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { createContext, useContext, useState, ReactNode, useEffect, Dispatch, SetStateAction } from "react";

export interface DropDownPosition { x: number; y: number; }
export interface Task {
  id: number;
  nome: string;
  priorita: string;
  done: boolean;
  progettoId: number;
}
export interface Categoria { id: number; nome: string; }
export interface Progetto { id: number; nome: string; categorie: Categoria[]; }

interface MenuItem { name: string; icon: any; isSelected: boolean; }
interface DropDownState<T> { open: boolean; position: DropDownPosition; selectedItem: T | null; }

interface GlobalContextType {
  progetti: Progetto[];
  setProgetti: Dispatch<SetStateAction<Progetto[]>>;
  fetchProjects: () => Promise<void>;
  createProject: (nome: string, categoriaIds: number[]) => Promise<void>;
  editProject: (proj: Progetto) => Promise<void>;
  deleteProject: (projId: number) => Promise<void>;

  tasksContext: {
    tasks: Task[];
    setTasks: Dispatch<SetStateAction<Task[]>>;
    fetchTasks: (projId: number) => Promise<void>;
    createTask: (nome: string, priorita: string, projId: number) => Promise<void>;
    deleteTask: (taskId: number) => Promise<void>;
  };

  categorie: { list: Categoria[]; setList: Dispatch<SetStateAction<Categoria[]>>; };

  isDark: boolean;
  setIsDark: (dark: boolean) => void;

  sideBar: { openSideBar: boolean; setOpenSideBar: (open: boolean) => void; };
  dashboardItems: { menuItems: MenuItem[]; setMenuItems: Dispatch<SetStateAction<MenuItem[]>>; };

  taskDropDown: DropDownState<Task> & { setOpen: (open: boolean) => void; setPosition: (pos: DropDownPosition) => void; setSelectedItem: (t: Task | null) => void; };
  projectDropDown: DropDownState<Progetto> & { setOpen: (open: boolean) => void; setPosition: (pos: DropDownPosition) => void; setSelectedItem: (p: Progetto | null) => void; };
  categoryDropDown: DropDownState<Categoria> & { setOpen: (open: boolean) => void; setPosition: (pos: DropDownPosition) => void; setSelectedItem: (c: Categoria | null) => void; };

  projectWindow: {
    openNewProjectBox: boolean;
    setOpenNewProjectBox: (open: boolean) => void;
    openCreatedProject: boolean;
    setOpenCreateProject: (open: boolean) => void;
    openTaskWindow: boolean;
    setOpenTaskWindow: (open: boolean) => void;
    openNewCategorieBox: boolean;
    setOpenNewCategorieBox: (open: boolean) => void;
    refreshProjects: boolean;
    setRefreshProjects: Dispatch<SetStateAction<boolean>>;
    editingProject: Progetto | null;
    setEditingProject: Dispatch<SetStateAction<Progetto | null>>;
    selectedProject: Progetto | null;
    setSelectedProject: Dispatch<SetStateAction<Progetto | null>>;
  };

  iconBox: { openIconBox: boolean; setOpenIconBox: (open: boolean) => void; };
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const [openSideBar, setOpenSideBar] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { name: "Home", icon: faDashboard, isSelected: true },
    { name: "Progetti", icon: faBarsProgress, isSelected: false },
    { name: "Categorie", icon: faLayerGroup, isSelected: false },
  ]);

  const [progetti, setProgetti] = useState<Progetto[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categorieList, setCategorieList] = useState<Categoria[]>([]);

  // Carica categorie da PHP
  useEffect(() => {
    async function loadCategorie() {
      try {
        const res = await fetch("/api/categorie.php");
        if (res.ok) {
          const data = await res.json();
          setCategorieList(data);
        }
      } catch (err) {
        console.error("Errore caricando categorie", err);
      }
    }
    loadCategorie();
  }, []);

  const [openNewProjectBox, setOpenNewProjectBox] = useState(false);
  const [openCreatedProject, setOpenCreateProject] = useState(false);
  const [openTaskWindow, setOpenTaskWindow] = useState(false);
  const [openNewCategorieBox, setOpenNewCategorieBox] = useState(false);
  const [openIconBox, setOpenIconBox] = useState(false);
  const [refreshProjects, setRefreshProjects] = useState(false);
  const [editingProject, setEditingProject] = useState<Progetto | null>(null);
  const [selectedProject, setSelectedProject] = useState<Progetto | null>(null);

  useEffect(() => {
    if (
      openNewProjectBox ||
      openIconBox ||
      openCreatedProject ||
      openTaskWindow ||
      openNewCategorieBox
    ) {
      setOpenNewProjectBox(false);
      setOpenIconBox(false);
      setOpenCreateProject(false);
      setOpenTaskWindow(false);
      setOpenNewCategorieBox(false);
    }
  }, [menuItems]);

  useEffect(() => {
  fetchProjects().catch((err) => console.error("Errore iniziale fetch progetti:", err));
}, []);

  const [taskOpen, setTaskOpen] = useState(false);
  const [taskPosition, setTaskPosition] = useState<DropDownPosition>({ x: 0, y: 0 });
  const [taskSelected, setTaskSelected] = useState<Task | null>(null);
  const [projOpen, setProjOpen] = useState(false);
  const [projPosition, setProjPosition] = useState<DropDownPosition>({ x: 0, y: 0 });
  const [projSelected, setProjSelected] = useState<Progetto | null>(null);
  const [catOpen, setCatOpen] = useState(false);
  const [catPosition, setCatPosition] = useState<DropDownPosition>({ x: 0, y: 0 });
  const [catSelected, setCatSelected] = useState<Categoria | null>(null);

  async function fetchProjects() {
    const res = await fetch('/api/progetti.php');
    if (!res.ok) throw new Error("Errore caricando progetti");
    const data: Progetto[] = await res.json();
    setProgetti(data);
  }
  async function createProject(nome: string, categoriaIds: number[]) {
    await fetch('/api/progetti.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, categoriaIds }),
    });
    await fetchProjects();
    setRefreshProjects(r => !r);
  }
  async function editProject(proj: Progetto) {
    await fetch('/api/progetti.php', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: proj.id, nome: proj.nome, categoriaIds: proj.categorie.map(c => c.id) }),
    });
    await fetchProjects();
  }
  async function deleteProject(projId: number) {
    await fetch(`/api/progetti.php?id=${projId}`, { method: 'DELETE' });
    setProgetti(prev => prev.filter(p => p.id !== projId));
    setRefreshProjects(r => !r);
  }

  async function fetchTasks(progettoId: number) {
    const res = await fetch(`/api/task.php?progettoId=${progettoId}`);
    if (!res.ok) throw new Error("Errore caricamento tasks");
    const data = await res.json();
    setTasks(data);
  }

  async function createTask(nome: string, priorita: string, projId: number) {
    await fetch('/api/task.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, priorita, progettoId: projId }),
    });
    await fetchTasks(projId);
  }
  async function deleteTask(taskId: number) {
    await fetch(`/api/task.php?id=${taskId}`, { method: 'DELETE' });
    setTasks(prev => prev.filter(t => t.id !== taskId));
  }

  const taskDropDown = { open: taskOpen, position: taskPosition, selectedItem: taskSelected, setOpen: setTaskOpen, setPosition: setTaskPosition, setSelectedItem: setTaskSelected };
  const projectDropDown = { open: projOpen, position: projPosition, selectedItem: projSelected, setOpen: setProjOpen, setPosition: setProjPosition, setSelectedItem: setProjSelected };
  const categoryDropDown = { open: catOpen, position: catPosition, selectedItem: catSelected, setOpen: setCatOpen, setPosition: setCatPosition, setSelectedItem: setCatSelected };

  return (
    <GlobalContext.Provider value={{
      progetti, setProgetti, fetchProjects, createProject, editProject, deleteProject,
      tasksContext: { tasks, setTasks, fetchTasks, createTask, deleteTask },
      categorie: { list: categorieList, setList: setCategorieList },

      isDark, setIsDark,
      sideBar: { openSideBar, setOpenSideBar },
      dashboardItems: { menuItems, setMenuItems },
      projectWindow: { openNewProjectBox, setOpenNewProjectBox, openCreatedProject, setOpenCreateProject, openTaskWindow, setOpenTaskWindow, openNewCategorieBox, setOpenNewCategorieBox, refreshProjects, setRefreshProjects, editingProject, setEditingProject, selectedProject, setSelectedProject },
      iconBox: { openIconBox, setOpenIconBox },

      taskDropDown, projectDropDown, categoryDropDown
    }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContextProvider() {
  const ctx = useContext(GlobalContext);
  if (!ctx) throw new Error("useGlobalContextProvider must be used within GlobalContextProvider");
  return ctx;
}
