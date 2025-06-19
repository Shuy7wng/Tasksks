import React from "react";
import ProjectsTopBar from "./ProjectsTopBar";
import ProjectsArea from "./ProjectsArea";
import { useGlobalContextProvider } from "@/app/contextAPI";
import AddProjects from "../AddProjects";
import DropDown from "../DropDown";
import ProjectWindow from "./ProjectWindow/ProjectWindow";

function Projects() {
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