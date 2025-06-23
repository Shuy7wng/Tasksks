"use client";

import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPlus, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { Checkbox } from "@mui/material";
import { useGlobalContextProvider } from "@/app/contextAPI";

interface TaskType {
  id: number;
  name: string;
  priority: string;
}

function TasksArea({ progettoId }: { progettoId: number }) {
  const { tasksContext, projectWindow } = useGlobalContextProvider();
  const { tasks, fetchTasks } = tasksContext;
  const { setOpenTaskWindow } = projectWindow;

  useEffect(() => {
    fetchTasks(progettoId);
  }, [progettoId]);

  return (
    <div className="rounded-xl p-9 px-1 md:px-9 h-full m-11 mt-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <span className="font-bold text-2xl">All Tasks</span>
          <button
            onClick={() => setOpenTaskWindow(true)}
            className="flex gap-1 text-[13px] p-2 px-3 items-center rounded-md cursor-pointer 
              bg-gradient-to-tr from-[#2c67f2] to-[#62cff4] text-white shadow-sm hover:bg-[#1e4ed8] transition"
          >
            <FontAwesomeIcon icon={faPlus} width={13} height={13} />
            <span className="font-light hidden md:flex">Add new</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span>Sort By:</span>
          <span className="font-bold text-[#2c67f2]">Name</span>
          <FontAwesomeIcon icon={faSortDown} className="text-[#2c67f2]" />
        </div>
      </div>

      <div className="p-3 mt-11 flex flex-col gap-6">
        {tasks.map((task) => (
          <SingleTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

function SingleTask({ task }: { task: TaskType }) {
  const { isDark, dropDown, projectWindow } = useGlobalContextProvider();
  const { setOpenDropDown, setDropDownPosition } = dropDown;
  const { setOpenCreateProject } = projectWindow;

  const handleOpenDropDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setOpenDropDown(true);
    setDropDownPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <div
      className={`p-3 rounded-lg flex justify-between items-center ${
        isDark ? "bg-[#161d3a]" : "bg-slate-100"
      }`}
    >
      <div>
        <div className="flex items-center">
          <Checkbox
            sx={{
              color: "#2c67f2",
              "&.Mui-checked": { color: "#2c67f2" },
            }}
          />
          <span className={isDark ? "text-white" : "text-black"}>{task.name}</span>
        </div>
        <span className="bg-gradient-to-tr from-[#2c67f2] to-[#62cff4] p-[4px] ml-3 px-3 rounded-md text-[12px] text-white">
          {task.priority}
        </span>
      </div>

      <div
        onClick={handleOpenDropDown}
        className="text-center right-3 cursor-pointer p-1 rounded-full h-7 w-7 hover:bg-gray-200 transition-all"
      >
        <FontAwesomeIcon icon={faEllipsis} className="text-gray-500" width={10} height={10} />
      </div>
    </div>
  );
}

export default TasksArea;
