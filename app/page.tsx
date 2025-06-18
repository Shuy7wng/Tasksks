"use client";
import Dashboard from "./Components/TopBar/Dashboard";
import Sidebar from "./Components/Sidebar";
import { useGlobalContextProvider } from "./contextAPI";
import Projects from "./Components/ProjectScreen/Projects";
import Categories from "./Components/CategoriesScreen/Categories";

export default function Page() {
  const { isDark, sideBar, dashboardItems } = useGlobalContextProvider();

  // Check di sicurezza
  if (!dashboardItems || !dashboardItems.menuItems) {
    return <div className="p-10 text-center">Loading dashboard...</div>;
  }

  const { openSideBar, setOpenSideBar } = sideBar;
  const { menuItems, setMenuItems } = dashboardItems;

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
    <div className={`montserrat flex w-full h-auto relative ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <Sidebar />
      {selectedComponent}
      <div className={`${openSideBar ? "block" : "hidden"} w-full h-full fixed bg-black z-9 opacity-20`}></div>
    </div>
  );
}
