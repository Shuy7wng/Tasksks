import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBars } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContextProvider } from "@/app/contextAPI";

function ProjectsTopBar() {
    const { isDark, sideBar, projectWindow } = useGlobalContextProvider();
    const { openSideBar, setOpenSideBar } = sideBar;
    const { openNewProjectBox, setOpenNewProjectBox } = projectWindow;

    return (
        <div className={`${isDark ? "bg-[#161d3a]" : "bg-white"} px-8 pt-6 pb-4 flex justify-between items-center`}>
            <div className="flex gap-7 items-center">

                <div className="flex cursor-pointer md:hidden">
                    <FontAwesomeIcon
                        onClick={() => setOpenSideBar(!openSideBar)}
                        height={14}
                        width={14}
                        icon={faBars} />
                </div>

                {/* Titolo e sottotitolo */}
                <div className="flex flex-col">
                    <span className="font-bold text-2xl">Progetto</span>
                    <p className="text-[12px]">3 Progetti</p>
                </div>

                {/* Bottone Aggiungi */}
                <button
                    onClick ={() => setOpenNewProjectBox(true)} 
                    
                className="cursor-pointer text-sm flex gap-1 items-center rounded-md p-2 px-4 text-white shadow-2xl bg-gradient-to-tr from-[#2c67f2] to-[#62cff4]">
                    <FontAwesomeIcon
                        icon={faPlus}
                        width={10}
                        height={10}
                    />
                    <p>Aggiungi</p>
                </button>
            </div>
        </div>
    );
}

export default ProjectsTopBar;
