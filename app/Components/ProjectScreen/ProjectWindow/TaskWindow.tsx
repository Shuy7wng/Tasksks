"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContextProvider } from "@/app/contextAPI";

type Props = {
  progettoId: number;
};

function TaskWindow({ progettoId }: Props) {
  const { projectWindow, isDark, tasksContext } = useGlobalContextProvider();
  const { fetchTasks } = tasksContext;
  const { openTaskWindow, setOpenTaskWindow } = projectWindow;

  const [nomeTask, setNomeTask] = useState("");
  const [priorita, setPriorita] = useState("");
  const [loading, setLoading] = useState(false);

  if (!openTaskWindow) return null;

  const handleAggiungiTask = async () => {
    if (!nomeTask || !priorita) {
      alert("Compila tutti i campi");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nomeTask, priorita, progettoId }),
      });

      const json = await res.json();

      if (res.ok) {
        await fetchTasks(progettoId);
        setOpenTaskWindow(false);
        setNomeTask("");
        setPriorita("");
      } else {
        alert("Errore durante l'aggiunta della task: " + (json.error || "Errore sconosciuto"));
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Errore di rete o server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
      <div
        className={`w-[95%] max-w-[570px] h-[400px] rounded-lg shadow-2xl p-6 py-7 flex flex-col pointer-events-auto transition-all
          ${isDark ? "bg-[#161d3a]" : "bg-white"}`}
      >
        <div className="flex justify-between items-center">
          <span className="font-semibold text-[20px] mt-1">Nuova Task</span>
          <FontAwesomeIcon
            onClick={() => setOpenTaskWindow(false)}
            className="opacity-30 cursor-pointer hover:opacity-60"
            icon={faClose}
          />
        </div>

        <div className="flex flex-col gap-2 mt-10 px-3">
          <label className="text-sm opacity-80" htmlFor="nomeTask">Nome Task</label>
          <input
            id="nomeTask"
            className={`border w-full outline-none p-3 rounded-md text-[12px] ${
              isDark ? "bg-[#222d57] border-gray-600 text-white" : "bg-white border-gray-200"
            }`}
            placeholder="Dai un nome alla tua task..."
            value={nomeTask}
            onChange={(e) => setNomeTask(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="flex flex-col gap-2 mt-8 mx-3">
          <label className="text-sm opacity-80" htmlFor="priorita">Priorità</label>
          <select
            id="priorita"
            className={`p-3 text-[13px] outline-none border rounded-md ${
              isDark ? "bg-[#222d57] border-gray-600 text-white" : "bg-white border-gray-200 opacity-90"
            }`}
            value={priorita}
            onChange={(e) => setPriorita(e.target.value)}
            disabled={loading}
          >
            <option value="">Seleziona la priorità</option>
            <option value="Opzionale">Opzionale</option>
            <option value="Chill">Chill</option>
            <option value="Da-fare">Da fare</option>
            <option value="URGENTE">URGENTE</option>
          </select>
        </div>

        <div className="text-center mx-2 mt-10">
          <button
            onClick={handleAggiungiTask}
            disabled={!nomeTask || !priorita || loading}
            className={`bg-gradient-to-tr from-[#2c67f2] to-[#62cff4] w-full p-3 text-white rounded-md text-sm hover:opacity-90 disabled:opacity-50`}
          >
            {loading ? "Caricamento..." : "Aggiungi"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskWindow;
