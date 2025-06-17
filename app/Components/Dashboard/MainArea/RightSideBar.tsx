import React from "react";
import { useGlobalContextProvider } from "@/app/contextAPI";
import LatestProjects from "./LatestProjects";

function RightSideBar() {
  const { isDark } = useGlobalContextProvider();

  return (
    <div className={`w-3/12 px-6 py-4 flex flex-col gap-6 ml-auto
      ${isDark ? "bg-black text-white" : "bg-slate-100 text-black"}`}>
      {/* OVERALL PROGRESS */}
      <div className="rounded-xl p-6 flex flex-col items-center gap-4 shadow">
        <span className="font-semibold text-lg">Overall Progress</span>

        <div className="bg-gradient-to-tr from-[#0893c9] to-sky-400 w-[130px] h-[130px] rounded-full flex flex-col justify-center items-center">
          <span className="font-extrabold text-3xl text-white">76%</span>
          <span className="text-xs font-light">Progress</span>
        </div>
      </div>

      {/* Latest Projects */}
      <LatestProjects />
    </div>
  );
}

export default RightSideBar;
