"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBars } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContextProvider } from "@/app/contextAPI";

function CategoriesTopBar() {
  const { isDark, sideBar, projectWindow, categorie } = useGlobalContextProvider();
  const { setOpenNewCategorieBox } = projectWindow;
  const { openSideBar, setOpenSideBar } = sideBar;

  const numeroCategorie = categorie.list.length;

  return (
    <div className={`${isDark ? "bg-[#161d3a]" : "bg-white-100"} px-8 pt-6 pb-4`}>
      <div className="flex gap-7 items-center">
        <div className="flex cursor-pointer md:hidden">
          <FontAwesomeIcon
            onClick={() => setOpenSideBar(!openSideBar)}
            height={14}
            width={14}
            icon={faBars}
          />
        </div>

        <div className="flex flex-col">
          <span className="font-bold text-2xl">Categorie</span>
          <p className="text-[12px]">
            {numeroCategorie} {numeroCategorie === 1 ? "Categoria" : "Categorie"}
          </p>
        </div>

        <button
          onClick={() => setOpenNewCategorieBox(true)}
          className="text-sm flex cursor-pointer gap-1 items-center rounded-md p-2 px-4 text-white shadow-2xl bg-gradient-to-tr from-[#2c67f2] to-[#62cff4]">
          <FontAwesomeIcon icon={faPlus} width={10} height={10} />
          <p>Aggiungi</p>
        </button>
      </div>
    </div>
  );
}

export default CategoriesTopBar;
