"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPlus, faSortDown } from "@fortawesome/free-solid-svg-icons";
import Checkbox from "@mui/material/Checkbox";
import DropDown from "../../DropDown";
import { useGlobalContextProvider, Task } from "@/app/contextAPI";

export default function TasksArea({ progettoId }: { progettoId: number }) {
  const { tasksContext, projectWindow, isDark, taskDropDown } = useGlobalContextProvider();
  const { tasks, setTasks } = tasksContext;
  const { setOpenTaskWindow } = projectWindow;
  const {
    open: openTaskMenu,
    position: taskMenuPos,
    selectedItem: selectedTaskItem,
    setOpen: setTaskMenuOpen,
  } = taskDropDown;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/task.php?progettoId=${progettoId}`);
        if (!res.ok) throw new Error("Errore nel caricamento dei task");
        const data = await res.json();
        if (mounted) setTasks(data);
      } catch (err) {
        console.error(err);
        alert("Errore nel caricamento delle task");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [progettoId]);

  async function handleDelete(task: Task) {
    try {
      const res = await fetch(`/api/task.php?id=${task.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Errore eliminazione task");
      setTasks(prev => prev.filter(t => t.id !== task.id));
    } catch (err) {
      console.error(err);
      alert("Impossibile eliminare la task");
    } finally {
      setTaskMenuOpen(false);
    }
  }

  return (
    <div className="rounded-xl p-9 px-1 md:px-9 h-full m-11 mt-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <h2 className="font-bold text-2xl">Tutte le task</h2>
          <button
            onClick={() => setOpenTaskWindow(true)}
            disabled={loading}
            className="flex items-center justify-center gap-2 text-[13px] h-9 px-4 rounded-md bg-gradient-to-tr from-[#2c67f2] to-[#62cff4] text-white shadow-sm hover:bg-[#1e4ed8] disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faPlus} className="w-3 h-3" />
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
          <p className={isDark ? "text-white" : "text-gray-700"}>Nessun task</p>
        ) : (
          tasks.map(task => <SingleTask key={task.id} task={task} />)
        )}
      </div>

      <DropDown<Task>
        open={openTaskMenu}
        onClose={() => setTaskMenuOpen(false)}
        position={taskMenuPos}
        selectedItem={selectedTaskItem}
        onDelete={handleDelete}
        isDark={isDark}
      />
    </div>
  );
}
function SingleTask({ task }: { task: Task }) {
  const { isDark, tasksContext, taskDropDown } = useGlobalContextProvider();
  const { setTasks } = tasksContext;
  const {
    setOpen: setTaskMenuOpen,
    setPosition: setTaskMenuPos,
    setSelectedItem: setTaskSelectedItem,
  } = taskDropDown;

  const [checked, setChecked] = React.useState(task.done ?? false);

  useEffect(() => {
    setChecked(task.done ?? false);
  }, [task.done]);

  function handleOpenDropDown(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    setTaskSelectedItem(task);
    setTaskMenuPos({ x: e.clientX, y: e.clientY });
    setTaskMenuOpen(true);
  }

  async function toggleDone(newChecked: boolean) {
    setChecked(newChecked);
    setTasks(prev =>
      prev.map(t => (t.id === task.id ? { ...t, done: newChecked } : t))
    );

    try {
      const res = await fetch(`/api/task.php`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: task.id, done: newChecked }),
      });
      if (!res.ok) throw new Error("Errore aggiornamento task");
    } catch (err) {
      console.error(err);
      alert("Errore durante l'aggiornamento dello stato della task");
      setChecked(!newChecked);
      setTasks(prev =>
        prev.map(t => (t.id === task.id ? { ...t, done: !newChecked } : t))
      );
    }
  }

  return (
    <div
      className={`py-5 rounded-md p-4 text-sm flex flex-col gap-6 relative shadow-sm ${isDark ? "bg-[#161d3a]" : "bg-slate-100"
        }`}
    >
      <div
        onClick={handleOpenDropDown}
        className="absolute right-3 top-3 cursor-pointer p-1 rounded-full h-7 w-7 hover:bg-gray-200 flex items-center justify-center z-10"
      >
        <FontAwesomeIcon icon={faEllipsis} className="text-gray-500" />
      </div>

      <div className="flex items-center">
        <Checkbox
          checked={checked}
          onChange={e => toggleDone(e.target.checked)}
          sx={{ color: "#2c67f2", "&.Mui-checked": { color: "#2c67f2" } }}
        />
        <span className={isDark ? "text-white" : "text-black"}>{task.nome}</span>
      </div>

      <div className="flex flex-wrap text-[12px]">
        <span className="bg-gradient-to-tr from-[#2c67f2] to-[#62cff4] p-1 rounded-md text-white px-3">
          {task.priorita}
        </span>
      </div>
    </div>
  );
}
