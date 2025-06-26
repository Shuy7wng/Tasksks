import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBars } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContextProvider } from "@/app/contextAPI";

function ProjectsTopBar() {
  const { isDark, sideBar, projectWindow, progetti } = useGlobalContextProvider();
  const { openSideBar, setOpenSideBar } = sideBar;
  const { setOpenNewProjectBox } = projectWindow;

  const toggleSidebar = () => setOpenSideBar(!openSideBar);

  return (
    <div className={`${isDark ? "bg-[#161d3a]" : "bg-white"} px-8 pt-6 pb-4 flex justify-between items-center`}>
      <div className="flex gap-7 items-center">
        <div
          className="flex cursor-pointer md:hidden"
          onClick={toggleSidebar}
          role="button"
          tabIndex={0}
          aria-label="Toggle sidebar menu"
          onKeyDown={e => { if (e.key === "Enter" || e.key === " ") toggleSidebar(); }}
        >
          <FontAwesomeIcon
            height={14}
            width={14}
            icon={faBars}
          />
        </div>

        <div className="flex flex-col">
          <span className="font-bold text-2xl">Progetti</span>
          <p className="text-[12px]">
            {progetti.length > 0 ? `${progetti.length} Progetti` : "Nessun progetto trovato"}
          </p>
        </div>

        <button
          onClick={() => setOpenNewProjectBox(true)}
          className="cursor-pointer text-sm flex gap-1 items-center rounded-md p-2 px-4 text-white shadow-2xl bg-gradient-to-tr from-[#2c67f2] to-[#62cff4]"
          aria-label="Aggiungi nuovo progetto"
        >
          <FontAwesomeIcon icon={faPlus} width={10} height={10} />
          <p>Aggiungi</p>
        </button>
      </div>
    </div>
  );
}

export default ProjectsTopBar;