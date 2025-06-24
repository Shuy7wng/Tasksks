"use client";

import React, { useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPlus, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { Checkbox } from "@mui/material";
import { useGlobalContextProvider, Task} from "@/app/contextAPI";

function TasksArea({ progettoId }: { progettoId: number }) {
  const { tasksContext, projectWindow, isDark } = useGlobalContextProvider();
  const { tasks, fetchTasks } = tasksContext;
  const { setOpenTaskWindow } = projectWindow;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      await fetchTasks(progettoId);
      if (mounted) setLoading(false);
    }
    load();
    return () => { mounted = false; };
  }, [progettoId]);  // <-- solo progettoId


  return (
    <div className="rounded-xl p-9 px-1 md:px-9 h-full m-11 mt-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <h2 className="font-bold text-2xl">All Tasks</h2>
          <button
            onClick={() => setOpenTaskWindow(true)}
            disabled={loading}
            className="flex gap-1 text-[13px] p-2 px-3 items-center rounded-md cursor-pointer 
              bg-gradient-to-tr from-[#2c67f2] to-[#62cff4] text-white shadow-sm hover:bg-[#1e4ed8] transition disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faPlus} width={13} height={13} />
            <span className="font-light hidden md:inline">Aggiungi</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm select-none">
          <span>Sort By:</span>
          <span className="font-bold text-[#2c67f2]">Nome</span>
          <FontAwesomeIcon icon={faSortDown} className="text-[#2c67f2]" />
        </div>
      </div>

      <div className="p-3 mt-11 flex flex-col gap-6 min-h-[100px]">
        {loading ? (
          <p className={isDark ? "text-white" : "text-gray-700"}>Caricamento...</p>
        ) : tasks.length === 0 ? (
          <p className={isDark ? "text-white" : "text-gray-700"}>Nessun task disponibile</p>
        ) : (
          tasks.map((task) => <SingleTask key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}

function SingleTask({ task }: { task: Task }) {
  const { isDark, dropDown } = useGlobalContextProvider();
  const { setOpenDropDown, setDropDownPosition, setSelectedItem } = dropDown;

  const handleOpenDropDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setSelectedItem(task);
    setDropDownPosition({ x: event.clientX, y: event.clientY });
    setOpenDropDown(true);
  };

  return (
    <div
      className={`p-3 rounded-lg flex justify-between items-center ${
        isDark ? "bg-[#161d3a]" : "bg-slate-100"
      }`}
    >
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Checkbox
            sx={{
              color: "#2c67f2",
              "&.Mui-checked": { color: "#2c67f2" },
            }}
            // gestione completamento futura
          />
          <span className={isDark ? "text-white" : "text-black"}>{task.nome}</span>
        </div>
        <span className="bg-gradient-to-tr from-[#2c67f2] to-[#62cff4] p-[4px] ml-3 px-3 rounded-md text-[12px] text-white mt-1 inline-block w-max">
          {task.priorita}
        </span>
      </div>

      <div
        onClick={handleOpenDropDown}
        className="cursor-pointer p-1 rounded-full h-7 w-7 hover:bg-gray-200 transition-all flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faEllipsis} className="text-gray-500" width={10} height={10} />
      </div>
    </div>
  );
}

export default TasksArea;
