"use client";

import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DarkMode from "../Components/Darkmode";
import { useGlobalContextProvider } from "@/app/contextAPI";

function Sidebar() {
  const { isDark, sideBar, dashboardItems } = useGlobalContextProvider();
  const { menuItems, setMenuItems } = dashboardItems;
  const { openSideBar, setOpenSideBar } = sideBar;
  const sideBarRef = useRef<HTMLDivElement>(null);

  // Stato per larghezza reale sidebar (dinamica)
  const [sidebarWidth, setSidebarWidth] = useState(280);

  useEffect(() => {
    function handleResize() {
      setOpenSideBar(false);
      if (sideBarRef.current) {
        setSidebarWidth(sideBarRef.current.offsetWidth);
      }
    }
    function handleOutsideClick(event: MouseEvent) {
      if (
        sideBarRef.current &&
        !sideBarRef.current.contains(event.target as Node)
      ) {
        setOpenSideBar(false);
      }
    }

    if (sideBarRef.current) {
      setSidebarWidth(sideBarRef.current.offsetWidth);
    }

    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [openSideBar, setOpenSideBar]);

  function updateItemSelection(indexItem: number) {
    const copyMenuItems = menuItems.map((item, index) => ({
      ...item,
      isSelected: indexItem === index,
    }));
    setMenuItems(copyMenuItems);
  }

  return (
    <>
      {/* Overlay per mobile (oscura il resto) */}
      {openSideBar && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: sidebarWidth,
            width: `calc(100vw - ${sidebarWidth}px)`,
            height: "100vh",
            backgroundColor: isDark
              ? "rgba(14, 19, 36, 0.3)"
              : "rgba(0,0,0,0.15)",
            zIndex: 30,
            pointerEvents: "none",
          }}
        />
      )}

      <div
        ref={sideBarRef}
        className={`${
          openSideBar ? "flex fixed top-0 left-0" : "hidden"
        } md:flex fixed top-0 left-0 h-screen w-[280px] 
        montserrat z-40 shadow-xl p-6 pt-12 flex-col gap-32 transition-colors 
        ${isDark ? "bg-[#0e1324]" : "bg-white"}`}
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
                ${
                  item.isSelected
                    ? isDark
                      ? "text-white border border-[#0893c9]"
                      : "text-white"
                    : "bg-transparent"
                }`}
              style={
                item.isSelected
                  ? {
                      backgroundImage:
                        "linear-gradient(to top,#2c67f2 , #62cff4)",
                    }
                  : {}
              }
            >
              <FontAwesomeIcon
                icon={item.icon}
                className={item.isSelected ? "text-white" : "text-[#2c67f2]"}
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
    </>
  );
}

export default Sidebar;
