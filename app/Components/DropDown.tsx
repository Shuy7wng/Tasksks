import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

interface DropDownPosition {
  x: number;
  y: number;
}

interface DropDownProps<T> {
  open: boolean;
  position: DropDownPosition;
  onClose: () => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  selectedItem: T | null;
  isDark: boolean;
}

function DropDown<T>({
  open,
  position,
  onClose,
  onEdit,
  onDelete,
  selectedItem,
  isDark,
}: DropDownProps<T>) {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);

  function handleEdit() {
    if (selectedItem) {
      onEdit(selectedItem);
    }
  }

  function handleDelete() {
    if (selectedItem) {
      onDelete(selectedItem);
    }
  }

  const dropMenuItem = [
    { name: "Modifica", icon: faPencil, action: handleEdit },
    { name: "Elimina", icon: faTrash, action: handleDelete },
  ];

  function handleMouseEnter(index: number) {
    setHoveredItem(index);
  }

  function handleMouseLeave() {
    setHoveredItem(null);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (open) {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={dropDownRef}
      style={{ left: position.x - 160, top: position.y + 20 }}
      className={`p-3 w-40 fixed z-50 shadow-md flex rounded-lg flex-col gap-3 text-[13px] ${
        isDark ? "bg-[#0e1324]" : "bg-white"
      }`}
    >
      {dropMenuItem.map((menuItem, index) => (
        <div
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={menuItem.action}
          key={index}
          className={`flex gap-2 items-center border select-none cursor-pointer border-gray-200 rounded-md p-3 transition-all`}
          style={{
            backgroundImage:
              index === hoveredItem
                ? "linear-gradient(to top,#2c67f2 , #62cff4)"
                : "none",
          }}
        >
          <FontAwesomeIcon
            className="size-4"
            icon={menuItem.icon}
            style={{
              color: index === hoveredItem ? "white" : "#2c67f2",
            }}
          />
          <div
            style={{
              color:
                index === hoveredItem ? "white" : isDark ? "white" : "black",
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
