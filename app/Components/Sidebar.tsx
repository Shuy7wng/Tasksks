import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DarkMode from "../Components/Darkmode";
import { useGlobalContextProvider } from "@/app/contextAPI";

interface MenuItem {
  name: string;
  icon: any;
  isSelected: boolean;
}

function Sidebar() {
  const { isDark, sideBar, dashboardItems } = useGlobalContextProvider();
  const { menuItems, setMenuItems } = dashboardItems;
  const { openSideBar, setOpenSideBar } = sideBar;
  const sideBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleResize() {
      setOpenSideBar(false)
    }
    function handleOutsideClick(event: MouseEvent) {
      if (
        sideBarRef.current && !sideBarRef.current.contains(event.target as Node)
      ) {
        setOpenSideBar(false);
      }
    }

    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [openSideBar]);
  console.log(openSideBar);

  function updateItemSelection(indexItem: number) {
    const copyMenuItems = menuItems.map((item, index) => {
      if (indexItem == index) {
        return { ...item, isSelected: true };
      }
      return { ...item, isSelected: false };
    });

    setMenuItems(copyMenuItems);
  }

  return (
    <div
      ref={sideBarRef}
      className={`${openSideBar ? "flex absolute h-full w-[280px] " : "hidden"}
      montserrat z-30 shadow-xl w-full max-w-[330px] h-screen p-6 pt-12 md:flex flex-col gap-32
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
                  backgroundImage: "linear-gradient(to top,#2c67f2 , #62cff4)",
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
