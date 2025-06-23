import React, { useEffect } from "react";
import ProjectsTopBar from "./ProjectsTopBar";
import ProjectsArea from "./ProjectsArea";
import { useGlobalContextProvider } from "@/app/contextAPI";
import AddProjects from "../AddProjects";
import DropDown from "../DropDown";
import ProjectWindow from "./ProjectWindow/ProjectWindow";

function Projects() {
    const { projectWindow } = useGlobalContextProvider();
    const { setRefreshProjects } = projectWindow;

    useEffect(() => {
        // Al montaggio della pagina, forza il refresh
        setRefreshProjects(prev => !prev);  // toggle boolean per triggerare l'useEffect in ProjectsArea
    }, [setRefreshProjects]);

    return (
        <div className={`h-full min-h-screen  w-full`}>
            <DropDown/>
            <AddProjects/>
            <ProjectsTopBar />
            <ProjectsArea />
            <ProjectWindow />
        </div>
    );
}

export default Projects;
