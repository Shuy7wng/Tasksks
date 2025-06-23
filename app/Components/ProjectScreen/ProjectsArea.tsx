"use client";
import { useEffect, useState } from "react";
import { Progetto, useGlobalContextProvider } from "@/app/contextAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faProjectDiagram,
  faBarsProgress,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import DropDown from "../DropDown";

function ProjectsArea() {
  const { isDark, dropDown, projectWindow } = useGlobalContextProvider();
  const { refreshProjects } = projectWindow;

  const {
    openDropDown,
    setOpenDropDown,
    dropDownPosition,
    setDropDownPosition,
    selectedItem,
    setSelectedItem,
  } = dropDown;

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

        const progettiArray = Array.isArray(data) ? data : data?.progetti || [];
        const progettiConCategorie = (progettiArray as Progetto[]).map((proj) => ({
          ...proj,
          categorie: Array.isArray(proj.categorie) ? proj.categorie : [],
        }));

        setProgetti(progettiConCategorie);
      } catch {
        setProgetti([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProgetti();
  }, [refreshProjects]);

  const gridCols = currentWidth < 588 ? 1 : currentWidth < 814 ? 2 : 3;

  function handleEdit(progetto: Progetto) {
    projectWindow.setOpenCreateProject(true);
    projectWindow.setEditingProject(progetto);
    setOpenDropDown(false);
  }

  async function handleDelete(progetto: Progetto) {
    try {
      const res = await fetch(`/api/progetti?id=${progetto.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Errore eliminazione progetto");

      setOpenDropDown(false);
      projectWindow.setRefreshProjects((prev) => !prev);
    } catch (error) {
      console.error("Errore eliminazione:", error);
      alert("Errore eliminazione progetto");
    }
  }

  return (
    <div className={`${isDark ? "bg-[#161d3a]" : "bg-slate-50"} p-8`}>
      <div
        className={`${
          isDark ? "bg-[#0e1324]" : "bg-white"
        } grid gap-4 p-6 rounded-md py-8 shadow-2xl`}
        style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }}
      >
        {loading ? (
          <p className={`${isDark ? "text-white" : "text-gray-700"}`}>
            Caricamento progetti...
          </p>
        ) : progetti.length === 0 ? (
          <p className={`${isDark ? "text-white" : "text-gray-700"}`}>
            Nessun progetto disponibile
          </p>
        ) : (
          progetti.map((progetto) => (
            <ProjectCard
              key={progetto.id}
              progetto={progetto}
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
  progetto,
  onEdit,
  onDelete,
}: {
  progetto: Progetto;
  onEdit: (p: Progetto) => void;
  onDelete: (p: Progetto) => void;
}) {
  const { isDark, dropDown } = useGlobalContextProvider();
  const { setOpenDropDown, setDropDownPosition, setSelectedItem } = dropDown;

  function handleOpenDropDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation();
    setSelectedItem(progetto);
    setDropDownPosition({ x: event.clientX, y: event.clientY });
    setOpenDropDown(true);
  }

  return (
    <div
      className={`${
        isDark ? "bg-[#161d3a]" : "bg-slate-100"
      } py-5 rounded-md p-4 text-sm flex flex-col gap-6 relative shadow-sm`}
    >
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
      <div className="flex gap-2 items-center">
        <FontAwesomeIcon
          className="bg-[#2c67f2] p-2 text-white rounded-full w-[12px] h-[12px]"
          height={13}
          width={13}
          icon={faProjectDiagram}
        />
        <span className="cursor-pointer hover:text-[#006fb4]">{progetto.nome}</span>
      </div>
      <div className="flex flex-col gap-2">
        <div
          className={`${
            isDark ? "text-white" : "text-gray-500"
          } flex justify-between items-center text-[12px]`}
        >
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon height={12} width={12} icon={faBarsProgress} />
            <span>Progresso</span>
          </div>
          <span>9/12</span>
        </div>
        <div className="w-full h-[5px] rounded-2xl bg-gray-400 overflow-hidden"></div>
      </div>
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
