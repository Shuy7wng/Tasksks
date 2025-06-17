import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBars } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContextProvider } from "@/app/contextAPI";

function ProjectsTopBar() {
    const { isDark, sideBar } = useGlobalContextProvider();
    const { openSideBar, setOpenSideBar } = sideBar;
    return (
        <div className={`${isDark ? "bg-blackColor" : "bg-whiteDirty"} px-8 pt-6 pb-4 flex justify-between items-start`}>
            <div className="flex gap-7 items-start">
                <div className="flex flex-col">
                    <span className="font-bold text-2xl">Projects</span>
                    <p className="text-[12px] font-light">3 Projects</p>
                </div>
                <button className="text-sm flex gap-1 items-center rounded-md p-2 px-4 text-white shadow-2xl bg-gradient-to-tr from-[#2c67f2] to-[#62cff4]">
                    <FontAwesomeIcon
                        className="font-bold"
                        icon={faPlus}
                        width={10}
                        height={10}
                    />
                    <p>Aggiungi</p>
                </button>
            </div>

            {/* Icona all'estrema destra */}
            <div className="flex items-start justify-end">
                <FontAwesomeIcon
                    className={`cursor-pointer ${isDark ? "text-white" : "text-gray-800"}`}
                    icon={faBars}
                    width={20}
                    height={20}
                    onClick={() => setOpenSideBar(!openSideBar)}
                />
            </div>
        </div>

    );
}

export default ProjectsTopBar;