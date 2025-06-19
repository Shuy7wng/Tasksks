"use client";
import { useEffect, useState } from "react";
import { useGlobalContextProvider } from "@/app/contextAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faProjectDiagram,
    faBarsProgress,
    faEllipsis,
} from "@fortawesome/free-solid-svg-icons";

function ProjectsArea() {
    const { isDark, dropDown } = useGlobalContextProvider();             //allProjectObject
    const [currentWidth, setCurrentWidth] = useState<number>(0);
    // const{allProjects } = allProjectsObject;

    useEffect(() => {
        function handleResize() {
            setCurrentWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [currentWidth]);

    return (
        <div
            className={`${isDark ? "bg-[#161d3a]" : "bg-slate-50"} p-8 `}>
            <div
                className={`${isDark ? "bg-[#0e1324]" : "bg-white"
                    } grid  gap-4 p-6 rounded-md py-8 shadow-2xl grid-cols-${currentWidth < 588 ? "1" : currentWidth < 814 ? "2" : "3"
                    }`}
            >
                {/* {allProjects.map((singleProject , projectIndex) => (
                    <div key={projectIndex}>
                    <ProjectCar singleProject={singleProject} />
                    </div>
                ))} */}
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
            </div>
        </div>
    );
}

export default ProjectsArea;

function ProjectCard() {                                        //{singleProject}:{singlePrpject: Project}
    // const{name} = singleProject;
    const { isDark, dropDown, projectWindow } = useGlobalContextProvider();
    const { setOpenDropDown, setDropDownPosition } = dropDown;
    const { setOpenCreateProject } = projectWindow;

    function handleOpenDropDown(
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) {
        if (event) {
            event.stopPropagation();
        }
        const xPosition = event.clientX;
        const yPosition = event.clientY;

        setOpenDropDown(true);
        setDropDownPosition({ x: xPosition, y: yPosition });
    }

    function handleOpenCreateProjectWindow() {
        setOpenCreateProject(true);
    }

    return (
        <div className={`${isDark ? "bg-[#161d3a]" : "bg-slate-100"} py-5 rounded-md p-4 text-sm flex flex-col gap-6 relative shadow-sm`}
        >
            {/* Three dots icon */}
            <div
                onClick={(event) => handleOpenDropDown(event)}
                className="absolute text-center right-3 cursor-pointer p-1 rounded-full h-7 w-7 hover:bg-gray-200 transition-all">
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
                    onClick={handleOpenCreateProjectWindow}
                    className="cursor-pointer hover:text-[#006fb4]">Progetto 1</span>    {/* {name} */}
            </div>
            {/* PROGRESS */}
            <div className="flex flex-col gap-2">
                <div className={`${isDark ? "text-white" : "text-gray-500"}
                    flex justify-between items-center text-[12px]`}>
                    <div className="flex gap-2 items-center">
                        <FontAwesomeIcon
                            height={12}
                            width={12}
                            icon={faBarsProgress} />
                        <span>Progresso</span>
                    </div>
                    {/*  */}
                    <span>9/12</span>
                </div>
                {/* PROGRESS BAR */}
                <div className="w-full h-[5px] rounded-2xl bg-gray-400 overflow-hidden">

                </div>
            </div>
            {/* Categories */}
            <div className="flex flex-wrap text-[12px] gap-2 mt-3">
                <div className="bg-gradient-to-tr from-[#2c67f2] to-[#62cff4] p-1 rounded-md text-white px-3">
                    Categoria 1
                </div>

                <div className="bg-gradient-to-tr from-[#2c67f2] to-[#62cff4] p-1 rounded-md text-white px-3">
                    Categoria 2
                </div>
            </div>
        </div>
    );
}

