import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faClose, faBars } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContextProvider } from "../../contextAPI";
import SearchBar from "./SearchBar";


export default function TopBar() {
  const { isDark,sideBar} = useGlobalContextProvider();
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const {openSideBar, setOpenSideBar} = sideBar;

  function handleClickedIcon(
    event: React.MouseEvent<SVGSVGElement, MouseEvent>)
    {
      event.stopPropagation();
      setOpenSideBar(true);
    }
  

  return (
    <div className={`p-8 pt-12 flex items-center justify-between ${isDark
      ? "bg-[#161d3a]" : "bg-white"
      }`}>

      <div className="flex gap-7 items-center">
        {/* bars icon */}
        <div className="flex md:hidden">
          <FontAwesomeIcon 
          onClick= {()=> setOpenSideBar(!openSideBar)}
          height={14} 
          width={14} 
          icon={faBars} />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-4xl">
            Home
          </span>
        </div>
      </div>

        <div className="flex items-center gap-3">
          {!openSearchBar && (
            <FontAwesomeIcon
              icon={faSearch}
              className={`cursor-pointer text-[20px] ${isDark ? "text-white" : "text-gray-700"}`}
              onClick={() => setOpenSearchBar(true)}
            />
          )}

          {openSearchBar && (
            <div className="flex items-center gap-2">
              <SearchBar />
              <FontAwesomeIcon
                icon={faClose}
                className={`cursor-pointer text-[18px] ${isDark ? "text-white" : "text-gray-700"}`}
                onClick={() => setOpenSearchBar(false)}
              />
            </div>
          )}
        </div>
      </div>
      );
}
