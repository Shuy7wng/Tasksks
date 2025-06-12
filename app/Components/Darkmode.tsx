import React from "react";
import { useGlobalContextProvider } from "../contextAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";

export default function DarkMode() {
    const { isDark, setIsDark } = useGlobalContextProvider();

    console.log(isDark);

    return (
        <div>
            <div className={`${isDark ? "bg-[#006fb4]" : "border bg-transparent"} rounded-3xl border-gray-300 h-[33px] w-[59px] flex relative`}>
                <div 
                    onClick={() => setIsDark(false)}
                    className="bg-red-500 h-full w-1/2 opacity-0"
                ></div>
                <div 
                    onClick={() => setIsDark(true)}
                    className="bg-blue-500 h-full w-1/2 opacity-0"
                ></div>
                <div className={`rounded-full h-[23px] w-[22px] top-[5px] ${isDark ? "bg-white translate-x-[34px]" : "bg-slate-300 translate-x-[4px]"} absolute transition-all flex items-center justify-center`}>
                    <FontAwesomeIcon
                        className={isDark ? "text-[#006fb4]" : "text-white"}
                        height={12}
                        width={12}
                        icon={isDark ? faMoon : faSun}
                    />
                </div>
            </div>
        </div>
    );
}