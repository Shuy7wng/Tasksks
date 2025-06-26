"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faProjectDiagram, faBarsProgress } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContextProvider, Progetto, Task, Categoria } from "@/app/contextAPI";
import CubePlusIcon from "@/app/assets/svgs/svgIcons";

export default function LatestProjects() {
  const { isDark } = useGlobalContextProvider();
  const [projects, setProjects] = useState<Progetto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      try {
        const res = await fetch("/api/progetti.php");
        const data = await res.json();
        const arr = Array.isArray(data) ? data : data?.progetti || [];
        setProjects(
          (arr as Progetto[])
            .map(p => ({
              ...p,
              categorie: Array.isArray(p.categorie) ? p.categorie : [],
            }))
            .sort((a, b) => b.id - a.id)
        );
      } catch (err) {
        console.error("Errore caricamento progetti:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const latest = projects[0];

  return (
    <div className={`rounded-xl p-6 flex flex-col items-center gap-4 shadow-2xl ${isDark ? "bg-[#0e1324]" : "bg-white"}`}>
      <span className={`font-semibold text-center text-lg ${isDark ? "text-white" : "text-gray-900"}`}>
        Ultimo progetto
      </span>

      {loading ? (
        <p className={`${isDark ? "text-white" : "text-gray-700"}`}>Caricamento...</p>
      ) : latest ? (
        <LatestProjectCard project={latest} />
      ) : (
        <EmptyProjectsPlaceholder />
      )}
    </div>
  );
}

function LatestProjectCard({ project }: { project: Progetto }) {
  const { isDark } = useGlobalContextProvider();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/task.php?progettoId=${project.id}`);
        const data: Task[] = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Errore fetch tasks:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [project.id]);

  const doneCount = tasks.filter(t => t.done).length;
  const totalCount = tasks.length;
  const percent = totalCount > 0 ? (doneCount / totalCount) * 100 : 0;

  return (
    <div className={`${isDark ? "bg-[#0e1324]" : "bg-slate-100"} w-full py-5 rounded-md p-4 text-sm flex flex-col gap-6 shadow`}>
      <div className="flex gap-2 items-center">
        <FontAwesomeIcon
          icon={faProjectDiagram}
          className="bg-[#2c67f2] p-2 text-white rounded-full w-[12px] h-[12px]"
        />
        <span className="font-semibold text-[15px]">{project.nome}</span>
      </div>

      {loading ? (
        <p className={`${isDark ? "text-white" : "text-gray-700"}`}>Caricamento task...</p>
      ) : (
        <div className="flex flex-col gap-2">
          <div className={`${isDark ? "text-white" : "text-gray-500"} flex justify-between items-center text-[12px]`}>
            <div className="flex gap-2 items-center">
              <FontAwesomeIcon height={12} width={12} icon={faBarsProgress} />
              <span>Progresso</span>
            </div>
            <span>{doneCount}/{totalCount}</span>
          </div>
          <div className="w-full h-[5px] rounded-2xl bg-gray-400 overflow-hidden">
            <div
              className="h-full transition-all duration-500 ease-in-out"
              style={{
                width: `${percent}%`,
                backgroundColor: "#2c67f2",
              }}
              title={`${Math.round(percent)}% completato`}
            />
          </div>
        </div>
      )}

      <div className="flex flex-wrap text-[12px] gap-2 mt-3">
        {(project.categorie ?? []).length > 0 ? (
          project.categorie.map((cat: Categoria) => (
            <span
              key={cat.id}
              className="bg-gradient-to-tr from-[#2c67f2] to-[#62cff4] p-1 rounded-md text-white px-3"
            >
              {cat.nome}
            </span>
          ))
        ) : (
          <span className={`${isDark ? "text-white" : "text-gray-700"}`}>Nessuna categoria</span>
        )}
      </div>
    </div>
  );
}

function EmptyProjectsPlaceholder() {
  const { isDark } = useGlobalContextProvider();
  return (
    <div className="p-1 gap-5 flex flex-col justify-center items-center text-center">
      <CubePlusIcon width={120} height={120} color="#d4d4d4" />
      <div className="flex flex-col items-center">
        <h3 className={`font-semibold text-lg mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>Vuoto</h3>
        <p className={`text-sm w-52 ${isDark ? "text-white" : "text-gray-900"}`}>Clicca per aggiungere Progetti</p>
      </div>
      <button className="bg-gradient-to-t from-[#2c67f2] to-[#62cff4] p-3 rounded-md text-white text-sm px-7">
        Aggiungi progetto
      </button>
    </div>
  );
}
