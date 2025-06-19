import React from "react";
import { useGlobalContextProvider } from "../../contextAPI";
import Statistics from "../Dashboard/MainArea/Statistics";
import TopBar from "../../Components/TopBar/TopBar";
import RightSideBar from "../Dashboard/MainArea/RightSideBar";

function Dashboard() {
  const { isDark } = useGlobalContextProvider();

  return (
    <div className={`montserrat w-full min-h-screen transition-colors duration-300 
    ${isDark ? "bg-[#161d3a] text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Top Bar */}
      <TopBar />

      {/* Main Area */}
      <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-6">
        {/* Statistics Area */}
        <div className="flex-1">
          <Statistics />
        </div>

        {/* Right Sidebar */}
        <div className="">
          <RightSideBar />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
