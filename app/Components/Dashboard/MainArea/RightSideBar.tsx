import React from "react";
import { useGlobalContextProvider } from "@/app/contextAPI";
import LatestProjects from "./LatestProjects";

function RightSideBar() {
  const { isDark } = useGlobalContextProvider();

  return (
    <div className={`w-full lg:w-[320px] rounded-2xl shadow-2xl transition-colors 
      ${isDark ? "bg-[#0e1324]" : "bg-white"}`}>
      
      <LatestProjects />
    </div>
  );
}

export default RightSideBar;
