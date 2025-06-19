import { useState, useRef, useEffect } from "react";
import { useGlobalContextProvider } from "@/app/contextAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

interface dropMenuItem {
    name: string;
    icon: any;
}

function DropDown() {
    const dropMenuItem: dropMenuItem[] = [
        { name: "Modifica", icon: faPencil },
        { name: "Elimina", icon: faTrash },
    ];
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);
    const { isDark, dropDown } = useGlobalContextProvider();
    const { openDropDown, setOpenDropDown, dropDownPosition } = dropDown;
    const dropDownRef = useRef<HTMLDivElement>(null);

    function handleMouseEnter(index: number) {
        setHoveredItem(index);
    }

    function handleMouseLeave(index: number) {
        setHoveredItem(null);
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropDownRef.current &&
                !dropDownRef.current.contains(event.target as Node)
            ) {
                setOpenDropDown(false);
            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, [openDropDown]);

    return (

        <div
            ref={dropDownRef}
            style={{ left: dropDownPosition.x - 160, top: dropDownPosition.y + 20 }}
            className={`p-3 w-40 fixed top-[120px] right-[120px] z-50 shadow-md flex rounded-lg flex-col gap-3 text-[13px] 
                ${isDark ? "bg-[#0e1324]" : "bg-white"} ${openDropDown ? "fixed" : "hidden"
                }`}

        >
            {dropMenuItem.map((menuItem, index) => (
                <div
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                    key={index}
                    className={`flex gap-2 items-center border select-none cursor-pointer border-gray-200 rounded-md p-3 transition-all `}
                    style={{
                        backgroundImage:
                            index === hoveredItem ? "linear-gradient(to top,#2c67f2 , #62cff4)" : `none`,
                    }}
                >
                    <FontAwesomeIcon
                        className="size-4 "
                        icon={menuItem.icon}
                        style={{
                            color: index === hoveredItem ? "white" : "#2c67f2",
                        }}
                    />
                    <div className=""
                        style={{
                            color: index === hoveredItem ? "white" : `${isDark ? "white" : "black"}`,
                        }}
                    >
                        {menuItem.name}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DropDown;