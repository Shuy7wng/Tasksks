import React, { useState } from "react";
import { useGlobalContextProvider } from "../../contextAPI";
import Statistics from "../Dashboard/MainArea/Statistics";
import TopBar from "../../Components/TopBar/TopBar";

function Dashboard() {
  const { isDark } = useGlobalContextProvider();
  return (
    <div className={`montserrat w-full min-h-screen ${isDark ? "blackColor" :
          "bg-white"}`}>
      <TopBar />
      <div
        className="xm-5 rounded-lg p-8 flex gap-4 text-white"
      >
        <div className=" ">
          <Statistics />
        </div>
      </div>
    </div>
  );
}
export default Dashboard;

