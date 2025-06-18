import React, { useState } from "react";
import { useGlobalContextProvider } from "@/app/contextAPI";
import Statistics from "./Statistics";
import RightSideBar from "./RightSideBar";
useGlobalContextProvider;

function MainArea() {
  const { isDark } = useGlobalContextProvider();

  return (
    <div
      className={`
    ${isDark ? "bg-blackColor" : "bg-slate-50"}  flex gap-3 w-full min-h-screen 
    transition-colors duration-300  overflow-hidden
  `}
    >
      <div>
        <Statistics />
      </div>
      <RightSideBar />
    </div>
  );
}

export default MainArea;