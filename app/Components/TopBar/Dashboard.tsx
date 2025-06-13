import React, { useState } from "react";
import { useGlobalContextProvider } from "../../contextAPI";
import Statistics from "../Dashboard/Statistics";
import TopBar from "../../Components/TopBar/TopBar";

function Dashboard() {
  const { isDark } = useGlobalContextProvider();
  return (
    <div className="montserrat w-full h-full">
      <TopBar />
      <div
        className="m-5 rounded-lg p-8 flex gap-4 text-white"
        style={{
          backgroundColor: isDark ? "rgba(22, 29, 58, 0.8)" : "rgba(243, 243, 243, 0.66)",
        }}
      >
        <div className=" ">
          <Statistics />
        </div>
      </div>
    </div>
  );
}
export default Dashboard;

