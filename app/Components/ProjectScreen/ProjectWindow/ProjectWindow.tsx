"use client";

import React from "react";
import { useGlobalContextProvider } from "@/app/contextAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import TasksArea from "./TaskArea";
import TaskWindow from "./TaskWindow";

function ProjectWindow() {
  const { projectWindow, isDark } = useGlobalContextProvider();
  const { openCreatedProject, setOpenCreateProject } = projectWindow;

  // Sidebar fissa a sinistra, ipotizzata larga 280px
  const sidebarWidth = 280;

  if (!openCreatedProject) return null;

  return (
    <>
      {/* Overlay simile ad AddProjects */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: sidebarWidth,
          width: `calc(100vw - ${sidebarWidth}px)`,
          height: "100vh",
          backgroundColor: isDark
            ? "rgba(14, 19, 36, 0.3)"
            : "rgba(0, 0, 0, 0.15)",
          zIndex: 30,
          pointerEvents: "none", // Non blocca i click
        }}
      />

      {/* Finestra centrale */}
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
        <TaskWindow />

        {/* Header */}
        <div className="p-4 bg-gradient-to-tr from-[#2c67f2] to-[#62cff4] flex items-center justify-between px-4 rounded-t-lg">
          <div className="flex flex-col text-white">
            <span className="font-semibold text-xl">Progetto 1</span>
            <span className="font-light text-xs">3 tasks</span>
          </div>
          <FontAwesomeIcon
            onClick={() => setOpenCreateProject(false)}
            className="text-white opacity-80 cursor-pointer text-sm"
            icon={faClose}
          />
        </div>

        {/* Corpo contenuto */}
        <div className="p-4 overflow-y-auto flex-1">
          <TasksArea />
        </div>
      </div>
    </>
  );
}

export default ProjectWindow;
