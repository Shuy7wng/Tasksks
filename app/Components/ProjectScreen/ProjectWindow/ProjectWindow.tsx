"use client";

import React from "react";
import { useGlobalContextProvider } from "@/app/contextAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import TasksArea from "./TaskArea";
import TaskWindow from "./TaskWindow";

function ProjectWindow() {
  const { projectWindow, isDark } = useGlobalContextProvider();
  const { openCreatedProject, setOpenCreateProject, selectedProject } = projectWindow;

  if (!openCreatedProject || !selectedProject) return null;

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 280,
          width: `calc(100vw - 280px)`,
          height: "100vh",
          backgroundColor: isDark ? "rgba(14, 19, 36, 0.3)" : "rgba(0, 0, 0, 0.15)",
          zIndex: 30,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: "1000px",
          height: "80vh",
        }}
        className={`${isDark ? "bg-[#0e1324]" : "bg-white"} shadow-2xl z-40
            transition-all duration-300 ease-in-out rounded-lg flex flex-col`}
      >
        <TaskWindow progettoId={Number(selectedProject.id)} />
        {/* Header con info progetto */}
        <div className="relative p-6 bg-gradient-to-tr from-[#2c67f2] to-[#62cff4] flex items-center justify-center px-4 rounded-t-lg">
          <span className="font-semibold text-3xl text-white">{selectedProject.nome}</span>
          <FontAwesomeIcon
            onClick={() => setOpenCreateProject(false)}
            className="text-white opacity-80 cursor-pointer text-lg absolute right-4"
            icon={faClose}
          />
        </div>
        <div className="p-4 overflow-y-auto flex-1">
          <TasksArea progettoId={Number(selectedProject.id)} />
        </div>
      </div>
    </>
  );
}

export default ProjectWindow;
