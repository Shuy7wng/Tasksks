import React from "react";
import ProjectsTopBar from "./ProjectsTopBar";
import ProjectsArea from "./ProjectsArea";
import { useGlobalContextProvider } from "@/app/contextAPI";
import AddProjects from "../AddProjects";

function Projects() {
    return (
        <div className={`h-[1000px] w-full`}>
            <AddProjects/>
            <ProjectsTopBar />
            <ProjectsArea />
        </div>
    );
}

export default Projects;