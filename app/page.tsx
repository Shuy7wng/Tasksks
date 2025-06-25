"use client";
import Dashboard from "./Components/TopBar/Dashboard";
import Sidebar from "./Components/Sidebar";
import { useGlobalContextProvider } from "./contextAPI";
import Projects from "./Components/ProjectScreen/Projects";
import Categories from "./Components/CategoriesScreen/Categories";
import 'dotenv/config';

export default function Page() {
  const { isDark, sideBar, dashboardItems } = useGlobalContextProvider();

  // Check di sicurezza
  if (!dashboardItems || !dashboardItems.menuItems) {
    return <div className="p-10 text-center">Loading dashboard...</div>;
  }

  const { openSideBar } = sideBar;
  const { menuItems } = dashboardItems;

  const selectedItem = menuItems.find((item) => item.isSelected);
  let selectedComponent = null;

  switch (selectedItem?.name) {
    case "Home":
      selectedComponent = <Dashboard />;
      break;
    case "Progetti":
      selectedComponent = <Projects />;
      break;
    case "Categorie":
      selectedComponent = <Categories />;
      break;
    default:
      selectedComponent = <div className="p-10">No section selected</div>;
      break;
  }

  return (
    <div
      className={`montserrat flex w-full h-auto relative ${
        isDark ? "bg-[#161d3a] text-white" : "bg-white text-gray-900"
      }`}
    >
      <Sidebar />
      {selectedComponent}
      <div
        aria-hidden="true"
        className={`${openSideBar ? "block" : "hidden"} w-full h-full fixed bg-[#161d3a] z-10 opacity-20`}
      />
    </div>
  );
}
