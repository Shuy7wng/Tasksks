"use client";
import { useEffect, useState } from "react";
import { Progetto, Categoria, useGlobalContextProvider } from "@/app/contextAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faProjectDiagram, faBarsProgress, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import DropDown from "../DropDown";

function ProjectsArea() {
  const { isDark, dropDown, projectWindow } = useGlobalContextProvider();
  const { refreshProjects } = projectWindow;
  const { openDropDown, setOpenDropDown, dropDownPosition, setDropDownPosition, selectedItem, setSelectedItem } = dropDown;

  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1024);
  const [projects, setProjects] = useState<Progetto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      try {
        const res = await fetch("/api/progetti");
        const data = await res.json();
        const arr = Array.isArray(data) ? data : data?.progetti || [];
        setProjects(
          (arr as Progetto[]).map(p => ({
            ...p,
            categorie: Array.isArray(p.categorie) ? p.categorie as Categoria[] : [],
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

  // Definisce numero colonne responsive
  const cols = windowWidth < 588 ? 1 : windowWidth < 814 ? 2 : 3;

  function handleEdit(proj: Progetto) {
    projectWindow.setEditingProject(proj);
    projectWindow.setOpenCreateProject(true);
    setOpenDropDown(false);
  }

async function handleDelete(proj: Progetto) {
  try {
    const res = await fetch(`/api/progetti?id=${proj.id}`, { method: "DELETE" });

    if (!res.ok) {
      // Proviamo a recuperare un JSON, ma se non c'è lo leggiamo come testo
      let errBody: any;
      try {
        errBody = await res.json();
      } catch {
        const text = await res.text();
        errBody = { message: text || "Nessun dettaglio fornito" };
      }

      console.error(
        "Errore server eliminar progetto:",
        res.status,
        res.statusText,
        errBody
      );
      alert(
        `Errore eliminazione progetto (${res.status}): ${
          errBody.error || errBody.message || res.statusText
        }`
      );
      return;
    }

    // Se arrivi qui, il delete è andato a buon fine
    setOpenDropDown(false);
    projectWindow.setRefreshProjects((v) => !v);

  } catch (networkError) {
    console.error("Network error during delete:", networkError);
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
          projects.map(proj => (
            <ProjectCard
              key={proj.id}
              project={proj}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}

        <DropDown<Progetto>
          open={openDropDown}
          onClose={() => setOpenDropDown(false)}
          position={dropDownPosition}
          selectedItem={selectedItem}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isDark={isDark}
        />
      </div>
    </div>
  );
}

export default ProjectsArea;

function ProjectCard({
  project,
  onEdit,
  onDelete,
}: {
  project: Progetto;
  onEdit: (p: Progetto) => void;
  onDelete: (p: Progetto) => void;
}) {
  const { isDark, dropDown, projectWindow } = useGlobalContextProvider();
  const { setOpenCreateProject, setSelectedProject } = projectWindow;
  const { setOpenDropDown, setDropDownPosition, setSelectedItem } = dropDown;

  function openMenu(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    setSelectedItem(project);
    setDropDownPosition({ x: e.clientX, y: e.clientY });
    setOpenDropDown(true);
  }

  function handleOpenProjectWindow() {
    setSelectedProject(project);
    setOpenCreateProject(true);
  }

  return (
    <div
      className={`${isDark ? "bg-[#161d3a]" : "bg-slate-100"} py-5 rounded-md p-4 text-sm flex flex-col gap-6 relative shadow-sm`}
    >
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

      <div className="flex flex-col gap-2">
        <div className={`${isDark ? "text-white" : "text-gray-500"} flex justify-between items-center text-[12px]`}>
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faBarsProgress} height={12} width={12} />
            <span>Progresso</span>
          </div>
          <span>9/12</span>
        </div>
        <div className="w-full h-[5px] rounded-2xl bg-gray-400 overflow-hidden"></div>
      </div>

      <div className="flex flex-wrap text-[12px] gap-2 mt-3">
        {project.categorie.length > 0 ? (
          project.categorie.map((cat: Categoria) => (
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
