"use client";

import Dashboard from "./Components/Dashboard/Dashboard";
import Sidebar from "./Components/Sidebar";
import { useGlobalContextProvider } from "./contextAPI";

export default function Home() {
  const { isDark } = useGlobalContextProvider();

  return (
    <div className={`flex min-h-screen montserrat ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      {/* Sidebar con larghezza fissa/responsiva */}
      <div className="w-full max-w-[330px] flex-shrink-0">
        <Sidebar />
      </div>

      {/* Contenuto principale che si adatta allo spazio rimanente */}
      <main className="flex-1 overflow-auto">
        <Dashboard />
      </main>
    </div>
  );
}
