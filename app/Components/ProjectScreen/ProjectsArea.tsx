"use client";
import { useEffect, useState } from "react";
import { Progetto, useGlobalContextProvider } from "@/app/contextAPI";  // import tipo corretto
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faProjectDiagram,
  faBarsProgress,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";

function ProjectsArea() {
  const { isDark, dropDown, projectWindow } = useGlobalContextProvider();
  const { refreshProjects } = projectWindow;

  const [currentWidth, setCurrentWidth] = useState<number>(window.innerWidth);
  const [progetti, setProgetti] = useState<Progetto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function handleResize() {
      setCurrentWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchProgetti() {
      setLoading(true);
      try {
        const res = await fetch("/api/progetti");
        const data = await res.json();

        if (Array.isArray(data)) {
          const progettiConCategorie = (data as Progetto[]).map((proj: Progetto) => ({
            ...proj,
            categorie: Array.isArray(proj.categorie) ? proj.categorie : [],
          }));
          setProgetti(progettiConCategorie);
        } else if (data && Array.isArray(data.progetti)) {
          const progettiConCategorie = (data.progetti as Progetto[]).map((proj: Progetto) => ({
            ...proj,
            categorie: Array.isArray(proj.categorie) ? proj.categorie : [],
          }));
          setProgetti(progettiConCategorie);
        } else {
          setProgetti([]);
        }
      } catch (error) {
        setProgetti([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProgetti();
  }, [refreshProjects]);

  // Determina quante colonne in base alla larghezza
  const gridCols = currentWidth < 588 ? "1" : currentWidth < 814 ? "2" : "3";

  if (loading) {
    return (
      <div className={`${isDark ? "bg-[#161d3a]" : "bg-slate-50"} p-8`}>
        <p className={`${isDark ? "text-white" : "text-gray-700"}`}>
          Caricamento progetti...
        </p>
      </div>
    );
  }

  return (
    <div className={`${isDark ? "bg-[#161d3a]" : "bg-slate-50"} p-8`}>
      <div
        className={`${isDark ? "bg-[#0e1324]" : "bg-white"} grid gap-4 p-6 rounded-md py-8 shadow-2xl`}
        style={{
          gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
        }}
      >
        {progetti.length === 0 ? (
          <p className={`${isDark ? "text-white" : "text-gray-700"}`}>
            Nessun progetto disponibile
          </p>
        ) : (
          progetti.map((progetto) => (
            <ProjectCard
              key={progetto.id}
              progetto={progetto}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ProjectsArea;

function ProjectCard({ progetto }: { progetto: Progetto }) {
  const { isDark, dropDown, projectWindow } = useGlobalContextProvider();
  const { setOpenCreateProject, setEditingProject, setRefreshProjects } = projectWindow;
  const {
    setOpenDropDown,
    setDropDownPosition,
    setSelectedProject,
    setDropdownContent,
  } = dropDown;


  function handleEdit() {
    setOpenCreateProject(true);
    setEditingProject(progetto);
    setOpenDropDown(false);
  }

  async function handleDelete() {
    try {
      const res = await fetch(`/api/progetti?id=${progetto.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Errore eliminazione progetto");

      setOpenDropDown(false);
      setRefreshProjects(prev => !prev);
    } catch (error) {
      console.error("Errore eliminazione:", error);
      alert("Errore eliminazione progetto");
    }
  }
  function handleOpenDropDown(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    event.stopPropagation();
    const xPosition = event.clientX;
    const yPosition = event.clientY;

    setSelectedProject(progetto);
    setOpenDropDown(true);
    setDropDownPosition({ x: xPosition, y: yPosition });

    // Qui puoi settare il contenuto del dropdown (funzionalità da implementare)
    setDropdownContent(
      <div className="flex flex-col">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEdit();
          }}
          className="px-3 py-1 hover:bg-gray-200"
        >
          Modifica
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          className="px-3 py-1 hover:bg-red-500 hover:text-white"
        >
          Elimina
        </button>
      </div>
    );
  }

  return (
    <div
      className={`${isDark ? "bg-[#161d3a]" : "bg-slate-100"
        } py-5 rounded-md p-4 text-sm flex flex-col gap-6 relative shadow-sm`}
    >
      {/* Three dots icon */}
      <div
        onClick={handleOpenDropDown}
        className="absolute text-center right-3 cursor-pointer p-1 rounded-full h-7 w-7 hover:bg-gray-200 transition-all"
      >
        <FontAwesomeIcon
          className="text-gray-500"
          icon={faEllipsis}
          height={10}
          width={10}
        />
      </div>
      {/* PROJECT NAME + ICON */}
      <div className="flex gap-2 items-center">
        <FontAwesomeIcon
          className="bg-[#2c67f2] p-2 text-white rounded-full w-[12px] h-[12px]"
          height={13}
          width={13}
          icon={faProjectDiagram}
        />
        <span
          onClick={() => {
            setOpenCreateProject(true);
            setEditingProject(null);
          }}
          className="cursor-pointer hover:text-[#006fb4]"
        >
          {progetto.nome}
        </span>
      </div>
      {/* ... resto uguale */}
      {/* PROGRESS */}
      <div className="flex flex-col gap-2">
        <div
          className={`${isDark ? "text-white" : "text-gray-500"
            } flex justify-between items-center text-[12px]`}
        >
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon height={12} width={12} icon={faBarsProgress} />
            <span>Progresso</span>
          </div>
          <span>9/12</span>
        </div>
        {/* PROGRESS BAR */}
        <div className="w-full h-[5px] rounded-2xl bg-gray-400 overflow-hidden"></div>
      </div>
      {/* Categories */}
      <div className="flex flex-wrap text-[12px] gap-2 mt-3">
        {Array.isArray(progetto.categorie) &&
          progetto.categorie.map((cat, index) => (
            <div
              key={index}
              className="bg-gradient-to-tr from-[#2c67f2] to-[#62cff4] p-1 rounded-md text-white px-3"
            >
              {String(cat)}
            </div>
          ))}
      </div>
    </div>
  );
}
