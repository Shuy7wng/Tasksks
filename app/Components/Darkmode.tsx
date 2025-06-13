"use client";

import React from "react";
import { useGlobalContextProvider } from "../contextAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";

export default function DarkMode() {
  const { isDark, setIsDark } = useGlobalContextProvider();

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div onClick={toggleTheme} className="cursor-pointer">
      <div
        className={`
          relative rounded-3xl h-[33px] w-[59px] flex items-center
          transition-colors duration-300 ease-in-out
          ${isDark ? "bg-[#006fb4]" : "bg-yellow-200"}
        `}
      >
        <div
          className={`
            rounded-full h-[23px] w-[23px] absolute top-[5px]
            transition-transform duration-300 ease-in-out
            ${isDark ? "translate-x-[34px] bg-white" : "translate-x-[4px] bg-white"}
            flex items-center justify-center
          `}
        >
          {isDark ? (
            <FontAwesomeIcon
              className="text-[#006fb4]"
              height={12}
              width={12}
              icon={faMoon}
            />
          ) : (
            <FontAwesomeIcon
              className="text-yellow-600"
              height={12}
              width={12}
              icon={faSun}
            />
          )}
        </div>
      </div>
    </div>
  );
}
