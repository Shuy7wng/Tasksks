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
  const { isDark, sideBar } = useGlobalContextProvider();
  const {openSideBar, setOpenSideBar} = sideBar;


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
      className={`hidden montserrat z-30 shadow-xl w-full max-w-[330px] h-screen p-6 pt-12 md:flex flex-col gap-32
        ${isDark ? "bg-[#161d3a]" :
        "bg-white"}`}
    >

      {/* Logo */}
      <div className="flex gap-2 items-center justify-center mb-6">
        <img
          src={isDark ? "/gattino_bianco.png" : "/gattino_nero.png"}
          alt="Gatto"
          className="h-[50px]"
          style={{ objectFit: "contain" }}
        />
        <span className="text-2xl font-bold">Tasksks</span>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-4 flex-grow">
        {menuItems.map((item, index) => (
  <button
  key={index}
  onClick={() => updateItemSelection(index)}
  className={`p-3 rounded-md cursor-pointer flex items-center justify-center gap-2
    ${item.isSelected ? (
      isDark
        ? "text-white border border-[#0893c9]"
        : "text-white"
    ) : "bg-transparent"}
  `}
  style={
    item.isSelected
      ? {
          backgroundImage: "linear-gradient(to top,#0893c9 , #38bdf8)", 
        }
      : {}
  }
>
  <FontAwesomeIcon
    icon={item.icon}
    className={item.isSelected ? "text-white" : "text-[#006fb4]"}
  />
  <span>{item.name}</span>
</button>
))}

      </nav>

      {/* Toggle in fondo */}
      <div className="mt-auto flex justify-center pt-6">
        <DarkMode />
      </div>
    </div>
  );
}

export default Sidebar;
