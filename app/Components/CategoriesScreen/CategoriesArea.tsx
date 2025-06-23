"use client";

import { useEffect, useState } from "react";
import { useGlobalContextProvider } from "@/app/contextAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

export function useCategorie() {
  const [list, setList] = useState<string[]>([])

  useEffect(() => {
    async function fetchCategorie() {
      try {
        const res = await fetch('/api/categorie/initializeDefaults')
        const data = await res.json()
        if (Array.isArray(data)) {
          setList(data.map((c: any) => c.nome))
        } else {
          setList(['do', 'todo']) // fallback locale se API fallisce
        }
      } catch {
        setList(['do', 'todo'])
      }
    }

    fetchCategorie()
  }, [])

  return { list, setList }
}

function CategoriesArea() {
  const { isDark, categorie, dropDown } = useGlobalContextProvider();
  const { openDropDown, setOpenDropDown, dropDownPosition, setDropDownPosition } = dropDown;

  // Per gestire la larghezza finestra
  const [currentWidth, setCurrentWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setCurrentWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Chiude dropdown al click fuori
  useEffect(() => {
    function handleClickOutside() {
      if (openDropDown) setOpenDropDown(false);
    }
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [openDropDown, setOpenDropDown]);

  function handleOpenDropDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation();
    setOpenDropDown(true);
    setDropDownPosition({ x: event.clientX, y: event.clientY });
  }

  return (
    <div className={`${isDark ? "bg-[#161d3a]" : "bg-slate-50"} p-8 h-[870px] relative`}>
      <div
        className={`${isDark ? "bg-[#0e1324]" : "bg-slate-50"} shadow-2xl rounded-md p-4 py-5 flex flex-col gap-4`}
      >
        {categorie.list.length === 0 && (
          <p className="text-gray-500">Nessuna categoria disponibile</p>
        )}
        {categorie.list.map((categoryName, index) => (
          <CategoriesCard
            key={index}
            categoryName={categoryName}
            onOpenDropDown={handleOpenDropDown}
            isDark={isDark}
          />
        ))}
      </div>

      {openDropDown && (
        <DropdownMenu position={dropDownPosition} />
      )}
    </div>
  );
}

interface CategoriesCardProps {
  categoryName: string;
  onOpenDropDown: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isDark: boolean;
}

function CategoriesCard({ categoryName, onOpenDropDown, isDark }: CategoriesCardProps) {
  return (
    <div
      className={`${isDark ? "bg-[#161D3A]" : "bg-slate-100"} shadow-sm p-4 flex px-5 rounded-md 
                text-[14px] justify-between items-center`}
    >
      <div className="flex flex-col">
        <span className="font-semibold">{categoryName}</span>
        <span className="text-[12px] text-gray-400">2 progetti</span>
      </div>
      <div
        onClick={onOpenDropDown}
        className="flex gap-5 hover:bg-gray-200 w-6 h-6 items-center justify-center rounded-full cursor-pointer"
      >
        <FontAwesomeIcon
          className="text-gray-500"
          width={15}
          height={15}
          icon={faEllipsis}
        />
      </div>
    </div>
  );
}

interface DropdownMenuProps {
  position: { x: number; y: number };
}

function DropdownMenu({ position }: DropdownMenuProps) {
  return (
    <div
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        backgroundColor: "white",
        borderRadius: 6,
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        padding: "8px 12px",
        zIndex: 1000,
      }}
    >
      <p className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">Modifica</p>
      <p className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">Elimina</p>
    </div>
  );
}

export default CategoriesArea;
