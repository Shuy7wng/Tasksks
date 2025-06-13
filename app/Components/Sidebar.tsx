import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGauge, faBarsProgress, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import DarkMode from "../Components/Darkmode";
import { useGlobalContextProvider } from "../contextAPI";

interface MenuItem {
  name: string;
  icon: any;
  isSelected: boolean;
}

function Sidebar() {
  const { isDark } = useGlobalContextProvider();

  const [menuItems, setMenuItems] = React.useState<MenuItem[]>([
    { name: "Dashboard", icon: faGauge, isSelected: true },
    { name: "Projects", icon: faBarsProgress, isSelected: false },
    { name: "Categories", icon: faLayerGroup, isSelected: false },
  ]);

  function updateItemSelection(indexItem: number) {
    const copyMenuItems = menuItems.map((item, index) => ({
      ...item,
      isSelected: index === indexItem,
    }));
    setMenuItems(copyMenuItems);
  }

  return (
    <div
      className={`flex flex-col w-full max-w-[330px] h-screen p-6 montserrat gap-6 border-r-2
        ${isDark ? "border-white" : "border-gray-300"}
      `}
    >
      {/* Logo */}
      <div className="flex gap-2 items-center">
        <img
          src={isDark ? "/gattino_bianco.png" : "/gattino_nero.png"}
          alt="Gatto"
          className="h-[50px]"
          style={{ objectFit: "contain" }}
        />
       <span className="text-2xl font-bold">
  Tasksks
</span>

      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-4 pt-30 pb-50">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => updateItemSelection(index)}
            className={`text-left p-3 rounded-md cursor-pointer border border-gray-200
              ${item.isSelected ? "bg-[#006fb4] text-white" : "bg-transparent"}`}
            style={{ color: item.isSelected ? "white" : "#006fb4" }}
          >
            <FontAwesomeIcon
              className={`${item.isSelected ? "text-white" : "text-#006fb4"}`}
              icon={item.icon}
            />
            {item.name}
          </button>
        ))}
      </nav>

      {/* Dark Mode */}
      <div className="flex justify-center">
        <DarkMode />
      </div>
    </div>
  );
}

export default Sidebar;
