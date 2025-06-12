"use client";

import Dashboard from "./Components/Dashboard/Dashboard";
import Sidebar from "./Components/Sidebar";
import { useGlobalContextProvider } from "./contextAPI";

export default function Home() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <Dashboard />

    </div>
  );
}