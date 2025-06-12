"use client";

import Dashboard from "./Components/Dashboard/Dashboard";
import Sidebar from "./Components/Sidebar";
import { useGlobalContextProvider } from "./contextAPI";

export default function Home() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <h2>Contenuto principale</h2>
      </main>
    </div>
  );
}