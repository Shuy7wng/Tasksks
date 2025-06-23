import React, { useEffect } from "react";
import ProjectsTopBar from "./ProjectsTopBar";
import ProjectsArea from "./ProjectsArea";
import { useGlobalContextProvider } from "@/app/contextAPI";
import AddProjects from "../AddProjects";
import DropDown from "../DropDown";
import ProjectWindow from "./ProjectWindow/ProjectWindow";

function Projects() {
  const { dropDown, projectWindow, isDark, editProject, deleteProject } = useGlobalContextProvider();
  const { setRefreshProjects } = projectWindow;
  const {
    openDropDown,
    setOpenDropDown,
    dropDownPosition,
    selectedProject,
  } = dropDown;

  useEffect(() => {
    setRefreshProjects(prev => !prev);
  }, [setRefreshProjects]);

  // Funzione per chiudere il dropdown
  function handleClose() {
    setOpenDropDown(false);
  }

  // Funzione per modificare un progetto
function handleEdit(project: any) {
  if (project) {
    editProject(project);
    setOpenDropDown(false);
    setRefreshProjects(prev => !prev);  // aggiorna la lista dopo modifica
  }
}

  // Funzione per eliminare un progetto
async function handleDelete(project: any) {
  if (project) {
    try {
      await deleteProject(project.id); // supponendo che ritorni Promise
      setOpenDropDown(false);
      setRefreshProjects(prev => !prev);
    } catch (e) {
      alert("Errore eliminazione progetto");
    }
  }
}

  return (
    <div className="h-full min-h-screen w-full">
      <DropDown
        open={openDropDown}
        position={dropDownPosition}
        onClose={handleClose}
        onEdit={handleEdit}
        onDelete={handleDelete}
        selectedProject={selectedProject}
        isDark={isDark}
      />
      <AddProjects />
      <ProjectsTopBar />
      <ProjectsArea />
      <ProjectWindow />
    </div>
  );
}

export default Projects;
