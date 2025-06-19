"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPodcast, faClose } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContextProvider } from "@/app/contextAPI";

function TaskWindow() {
  const { projectWindow, isDark } = useGlobalContextProvider();
  const { openTaskWindow, setOpenTaskWindow } = projectWindow;

  if (!openTaskWindow) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
      <div
        className={`w-[95%] max-w-[570px] h-[400px] rounded-lg shadow-2xl p-6 py-7 flex flex-col pointer-events-auto transition-all
          ${isDark ? "bg-[#161d3a]" : "bg-white"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <span className="font-semibold text-[20px] mt-1">Nuova Task</span>
          <FontAwesomeIcon
            onClick={() => setOpenTaskWindow(false)}
            className="opacity-30 cursor-pointer hover:opacity-60"
            icon={faClose}
          />
        </div>

        {/* Nome Task */}
        <div className="flex flex-col gap-2 mt-10 px-3">
          <span className="text-sm opacity-80">Nome Task</span>
          <div className="flex gap-4 justify-between items-center">
            <input
              className={`border w-full outline-none p-3 rounded-md text-[12px] ${
                isDark
                  ? "bg-[#222d57] border-gray-600 text-white"
                  : "bg-white border-gray-200"
              }`}
              placeholder="Dai un nome alla tua task..."
            />
          </div>
        </div>

        {/* Priorità */}
        <div className="flex flex-col gap-2 mt-8 mx-3">
          <span className="text-sm opacity-80">Priorità</span>
          <select
            className={`p-3 text-[13px] outline-none border rounded-md ${
              isDark
                ? "bg-[#222d57] border-gray-600 text-white"
                : "bg-white border-gray-200 opacity-90"
            }`}
          >
            <option value="">Seleziona la priorità</option>
            <option value="opzionale">Opzionale</option>
            <option value="chill">Chill</option>
            <option value="dafare">Da fare</option>
            <option value="urgente">URGENTE</option>
          </select>
        </div>

        {/* Bottone Aggiungi */}
        <div className="text-center mx-2 mt-10">
          <button className="bg-gradient-to-tr from-[#2c67f2] to-[#62cff4] w-full p-3 text-white rounded-md text-sm hover:opacity-90">
            Aggiungi
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskWindow;
