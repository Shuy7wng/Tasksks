import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDashboard, faBarsProgress, faLayerGroup } from "@fortawesome/free-solid-svg-icons";

interface MenuItem {
  name: string;
  icon: any;
  isSelected: boolean;
}

function Sidebar() {
  const [menuItems, setMenuItems] = React.useState([
    { name: "Dashboard", isSelected: true },
    { name: "Projects", isSelected: false },
    { name: "Categories", isSelected: false },
  ]);

  function updateItemSelection(indexItem: number) {
    const copyMenuItems = menuItems.map((item, index) => ({
      ...item,
      isSelected: index === indexItem,
    }));
    setMenuItems(copyMenuItems);
  }

  return (
    <div className="flex flex-col w-[330px] h-screen p-6 border border-gray-200 montserrat gap-6">
      {/* Logo */}
      <div className="flex gap-2 items-center">
        {/* immagine o icona */}
         <img
          src="/gatto.png"      
          alt="Gatto"
          className="h-[50px]"
          style={{ objectFit: "contain" }}
        />
        <span className="text-2xl font-bold text-[#006fb4]">Tasksks</span>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-3">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => updateItemSelection(index)}
            className={`text-left p-3 rounded-md cursor-pointer border border-gray-200
              ${
                item.isSelected
                  ? "bg-[#006fb4] text-white"
                  : "bg-transparent text-black hover:border-[#006fb4]"
              }
            `}
          >
            {item.name}
          </button>
        ))}
      </nav>

      {/* Dark Mode */}
      <div className="mt-auto border p-3 text-center cursor-pointer select-none">
        Dark Mode
      </div>
    </div>
  );
}

export default Sidebar;
