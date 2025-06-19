"use client";
import { useEffect, useState } from "react";
import { useGlobalContextProvider } from "@/app/contextAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faProjectDiagram,
    faBarsProgress,
    faEllipsis,
} from "@fortawesome/free-solid-svg-icons";

interface category {
    name: string,
    description: string;
}

function CategoriesArea() {
    const { isDark, dropDown } = useGlobalContextProvider();
    const [currentWidth, setCurrentWidth] = useState<number>(0);
    useEffect(() => {
        function handleResize() {
            setCurrentWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [currentWidth]);

    return (
         <div
            className={`${isDark ? "bg-[#161d3a]" : "bg-slate-50"} p-8 h-[870px]`}>
            <div
                className={`${isDark ? "bg-[#0e1324]" : "bg-slate-50"} shadow-2xl rounded-md p-4 py-5 flex flex-col gap-4`}>

                <CategoriesCard />
                <CategoriesCard />
                <CategoriesCard />
            </div>
        </div>
    );


    function CategoriesCard() {
        const { dropDown } = useGlobalContextProvider();
    const { openDropDown,setOpenDropDown, setDropDownPosition } = dropDown;

    function handleOpenDropDown(
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) {
        if (event) {
            event.stopPropagation();
        }
        const xPosition = event.clientX;
        const yPosition = event.clientY;

        setOpenDropDown(true);
        setDropDownPosition({ x: xPosition, y: yPosition });
    }

        return (
            <div
                className={`${isDark ? "bg-[#161D3A]" : "bg-slate-100"} shadow-sm p-4 flex px-5 rounded-md 
                text-[14px] justify-between items-center`}>
                <div className="flex flex-col">
                    <span className="font-semibold">Categoria 1</span>
                    <span className="text-[12px] text-gray-400">2 progetti</span>
                </div>
                <div 
                onClick={(event) => handleOpenDropDown(event)}
                className="flex gap-5 hover:bg-gray-200 w-6 h-6 items-center justify-center rounded-full">
                    <FontAwesomeIcon
                        className="text-gray-500 cursor-pointer"
                        width={15}
                        height={15}
                        icon={faEllipsis} />
                </div>
            </div>
        );
    }
}
export default CategoriesArea;