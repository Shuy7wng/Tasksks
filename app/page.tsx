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
      break;
  }

  return (
    <div className={`flex min-h-screen montserrat ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      {/* Sidebar con larghezza fissa/responsiva */}
      <div className="w-full max-w-[330px] flex-shrink-0">
        <Sidebar />
      </div>

      {/* Contenuto principale che si adatta allo spazio rimanente */}
      <main className="flex-1 overflow-auto">
        <Dashboard />
      </main>
    </div>
  );
}
