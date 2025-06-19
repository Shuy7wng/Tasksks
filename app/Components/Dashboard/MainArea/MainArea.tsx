import React, { useState } from "react";
import { useGlobalContextProvider } from "@/app/contextAPI";
import Statistics from "./Statistics";
import RightSideBar from "./RightSideBar";
function MainArea() {
  const { isDark } = useGlobalContextProvider();

  return (
  <div className={`${isDark ? "bg-white" : "bg-slate-50"} gap-3 w-full min-h-screen`}>
      <div>
        <Statistics />
      </div>
      <RightSideBar />
    </div>
  );
}

export default MainArea;