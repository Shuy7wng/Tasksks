import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEllipsis, faPlus,
    faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { Checkbox } from "@mui/material";
import { useGlobalContextProvider } from "@/app/contextAPI";
//import colors from "@/app/colors";

function TasksArea() {
    const { projectWindow } = useGlobalContextProvider();
    const { openTaskWindow, setOpenTaskWindow } = projectWindow;
    return (
        <div className=" rounded-xl p-9 px-1 md:px-9 h-full m-11 mt-3 ">
            <div className=" flex items-center justify-between">

                {/* Sinistra: All Tasks + Add New */}
                <div className="flex gap-3">
                    <span className="font-bold text-2xl">All Tasks</span>
                    <button
                    onClick ={() => setOpenTaskWindow(true)} 
                        className="flex gap-1 text-[13px] p-2 px-3 items-center rounded-md cursor-pointer 
                        bg-gradient-to-tr from-[#2c67f2] to-[#62cff4] text-white shadow-sm hover:bg-[#1e4ed8] transition">
                        <FontAwesomeIcon
                            width={13}
                            height={13}
                            className="rounded-full"
                            icon={faPlus}
                        />
                        <span className="font-light hidden md:flex">Add new</span>
                    </button>
                </div>

                {/* Destra: Sort By */}
                <div className="flex items-center gap-2 text-sm">
                    <span>Sort By:</span>
                    <span className="font-bold text-[#2c67f2]">Name</span>
                    <FontAwesomeIcon className="text-[#2c67f2]" icon={faSortDown} />
                </div>
            </div>


            {/* Tasks */}
            <div className=" p-3 mt-11 flex flex-col gap-6">
                <SingleTask />
                <SingleTask />
                <SingleTask />
                <SingleTask />
            </div>
        </div>

    );
}

export default TasksArea;

function SingleTask() {
    const { isDark, dropDown, projectWindow } = useGlobalContextProvider();
    const { setOpenDropDown, setDropDownPosition } = dropDown;
    const { setOpenCreateProject } = projectWindow;
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
    function handleOpenCreateProjectWindow() {
        setOpenCreateProject(true);
    }
    return (
        <div className={`p-3 rounded-lg ${isDark ? "bg-[#161d3a]" : "bg-slate-100"} flex justify-between items-center`}>
            <div>
                <div className="flex items-center">
                    <Checkbox
                        sx={{
                            color: "#2c67f2",
                            "&.Mui-checked": {
                                color: "#2c67f2",
                            }
                        }} />
                    <span className={`${isDark ? "text-white" : "text-black"}`}>Task 1</span>
                </div>
                <span className="bg-gradient-to-tr from-[#2c67f2] to-[#62cff4] p-[4px] ml-3 px-3 rounded-md text-[12px] text-white">
                    low
                </span>
            </div>
            <div
                onClick={(event) => handleOpenDropDown(event)}
                className="text-center right-3 cursor-pointer p-1 rounded-full h-7 w-7 hover:bg-gray-200 transition-all">
                <FontAwesomeIcon
                    className="text-gray-500 flex gap-4"
                    icon={faEllipsis}
                    height={10}
                    width={10}
                />
            </div>
        </div>
    );
}