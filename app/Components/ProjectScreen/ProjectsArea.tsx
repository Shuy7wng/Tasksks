"use client";

import { useEffect, useRef, useState } from "react";
import { Progetto, Categoria, Task, useGlobalContextProvider } from "@/app/contextAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faProjectDiagram, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import DropDown from "../DropDown";

export default function ProjectsArea() {
  const { isDark, projectWindow, projectDropDown, tasksContext } = useGlobalContextProvider();
  const { refreshProjects, openCreatedProject, setRefreshProjects } = projectWindow;
  const { tasks } = tasksContext;

  const {
    open: openProjMenu,
    position: projMenuPos,
    selectedItem: selectedProjItem,
    setOpen: setProjMenuOpen,
  } = projectDropDown;

  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const [projects, setProjects] = useState<Progetto[]>([]);
  const [loading, setLoading] = useState(true);

  // 📌 Ref per memorizzare lo stato precedente della finestra task
  const prevOpenRef = useRef<boolean>(openCreatedProject);

  // 📌 Quando la finestra viene chiusa, ricarica i progetti
  useEffect(() => {
    if (prevOpenRef.current && !openCreatedProject) {
      // La finestra è stata chiusa
      setRefreshProjects(v => !v);
    }
    prevOpenRef.current = openCreatedProject;
  }, [openCreatedProject, setRefreshProjects]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      try {
        const res = await fetch("/api/progetti.php");
        const data = await res.json();
        const arr = Array.isArray(data) ? data : data?.progetti || [];
        setProjects(
          (arr as Progetto[]).map(p => ({
            ...p,
            categorie: Array.isArray(p.categorie) ? (p.categorie as Categoria[]) : [],
          }))
        );
      } catch {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, [refreshProjects]);

  const cols = windowWidth < 588 ? 1 : windowWidth < 814 ? 2 : 3;

  async function handleDelete(proj: Progetto) {
    try {
      const res = await fetch(`/api/progetti.php?id=${proj.id}`, { method: "DELETE" });
      if (!res.ok) {
        const text = await res.text();
        alert(`Errore eliminazione progetto: ${text}`);
        return;
      }
      setProjMenuOpen(false);
      projectWindow.setRefreshProjects(v => !v);
    } catch {
      alert("Errore di rete durante l'eliminazione del progetto");
    }
  }

  return (
    <div className={`${isDark ? "bg-[#161d3a]" : "bg-slate-50"} p-8`}>
      <div
        className={`${isDark ? "bg-[#0e1324]" : "bg-white"} grid gap-4 p-6 rounded-md py-8 shadow-2xl`}
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {loading ? (
          <p className={`${isDark ? "text-white" : "text-gray-700"}`}>Caricamento progetti...</p>
        ) : projects.length === 0 ? (
          <p className={`${isDark ? "text-white" : "text-gray-700"}`}>Nessun progetto disponibile</p>
        ) : (
          projects.map(proj => {
            const projectTasks = tasks.filter(t => t.progettoId === proj.id);
            return (
              <ProjectCard
                key={proj.id}
                project={proj}
                tasks={projectTasks}
                onDelete={handleDelete}
              />
            );
          })
        )}

        <DropDown<Progetto>
          open={openProjMenu}
          onClose={() => setProjMenuOpen(false)}
          position={projMenuPos}
          selectedItem={selectedProjItem}
          onDelete={handleDelete}
          isDark={isDark}
        />
      </div>
    </div>
  );
}


function ProjectCard({
  project,
  tasks,
  onDelete,
}: {
  project: Progetto;
  tasks: Task[];
  onDelete: (p: Progetto) => void;
}) {
  const { isDark, projectWindow, projectDropDown } = useGlobalContextProvider();
  const { setOpenCreateProject, setSelectedProject } = projectWindow;
  const {
    setOpen: setProjMenuOpen,
    setPosition: setProjMenuPos,
    setSelectedItem: setProjSelectedItem,
  } = projectDropDown;
  const [projectTasks, setProjectTasks] = useState<Task[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);


  useEffect(() => {
    async function loadTasks() {
      setLoadingTasks(true);
      try {
        const res = await fetch(`/api/task.php?progettoId=${project.id}`);
        const data: Task[] = await res.json();
        setProjectTasks(data);
      } catch (err) {
        console.error("Errore fetch tasks", err);
        setProjectTasks([]);
      } finally {
        setLoadingTasks(false);
      }
    }
    loadTasks();
  }, [project.id]);

  const doneCount = projectTasks.filter(t => t.done).length;
  const totalCount = projectTasks.length;
  const percent = totalCount > 0 ? (doneCount / totalCount) * 100 : 0;

  function openMenu(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    setProjSelectedItem(project);
    setProjMenuPos({ x: e.clientX, y: e.clientY });
    setProjMenuOpen(true);
  }

  function handleOpenProjectWindow() {
    setSelectedProject(project);
    setOpenCreateProject(true);
  }

  return (
    <div className={`${isDark ? "bg-[#161d3a]" : "bg-slate-100"} py-5 rounded-md p-4 text-sm flex flex-col gap-6 relative shadow-sm`}>
      <div
        onClick={openMenu}
        className="absolute right-3 top-3 cursor-pointer p-1 rounded-full h-7 w-7 hover:bg-gray-200 flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faEllipsis} className="text-gray-500" />
      </div>

      <div className="flex gap-2 items-center">
        <FontAwesomeIcon
          icon={faProjectDiagram}
          className="bg-[#2c67f2] p-2 text-white rounded-full w-[12px] h-[12px]"
        />
        <span
          onClick={handleOpenProjectWindow}
          className="cursor-pointer hover:text-[#006fb4]"
          title="Apri progetto"
        >
          {project.nome}
        </span>
      </div>

      <div className={`${isDark ? "text-white" : "text-black"} mt-4`}>
        {loadingTasks ? (
          <p className="text-sm">Caricamento task...</p>
        ) : (
          <>
            <div className="flex justify-between mb-1 text-sm">
              <span>Task completati</span>
              <span>{doneCount}/{totalCount}</span>
            </div>
            <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500 ease-in-out"
                style={{
                  width: `${percent}%`,
                  backgroundColor: "#2c67f2",   
                }}
                title={`${Math.round(percent)}% completato`}
              />
            </div>
          </>
        )}
      </div>

      {/* Categorie */}
      <div className="flex flex-wrap text-[12px] gap-2 mt-3">
        {(project.categorie ?? []).length > 0 ? (
          project.categorie.map(cat => (
            <span
              key={cat.id}
              className="bg-gradient-to-tr from-[#2c67f2] to-[#62cff4] p-1 rounded-md text-white px-3"
            >
              {cat.nome}
            </span>
          ))
        ) : (
          <span>Nessuna categoria</span>
        )}
      </div>
    </div>
  );
}