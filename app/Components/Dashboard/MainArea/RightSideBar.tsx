import React from "react";
import { useGlobalContextProvider } from "@/app/contextAPI";
import LatestProjects from "./LatestProjects";

function RightSideBar() {
  const { isDark } = useGlobalContextProvider();

  return (
    <div className="w-3/12 px-6 flex flex-col gap-6 ml-auto">
      {/* Latest Projects */}
      <LatestProjects />
    </div>
  );
}

export default RightSideBar;
