import { useState } from "react";
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
    const { isDark } = useGlobalContextProvider();

    function handleMouseEnter(index: number) {
        setHoveredItem(index);
    }

    function handleMouseLeave(index: number) {
        setHoveredItem(null);
    }
    return (
        <div
            className={`p-3 w-40 fixed top-[120px] right-[120px] z-50 shadow-md flex rounded-lg flex-col gap-3 text-[13px] 
                ${isDark ? "bg-blackColorDark" : "bg-white"}`}
        >
            {dropMenuItem.map((menuItem, index) => (
                <div
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                    key={index}
                    className={`flex gap-2 items-center border select-none cursor-pointer border-gray-200 rounded-md p-3 transition-all `}
                    style={{
                        backgroundColor:
                            index === hoveredItem ? "rgb(62, 99, 255)" : `transparent`,
                    }}
                >
                    <FontAwesomeIcon
                        className="size-4 "
                        icon={menuItem.icon}
                        style={{
                            color: index === hoveredItem ? "white" : "rgb(62, 99, 255)",
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