import React from "react";
import { useGlobalContextProvider } from "@/app/contextAPI";
import LatestProjects from "./LatestProjects";

function RightSideBar() {
  const { isDark } = useGlobalContextProvider();

  return (
    <div className={`w-full lg:w-[320px] rounded-2xl shadow-2xl transition-colors 
      ${isDark ? "bg-blackColor" : "bg-white"}`}>
      
      <LatestProjects />
    </div>
  );
}

export default RightSideBar;
