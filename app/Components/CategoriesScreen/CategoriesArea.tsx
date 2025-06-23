"use client";

import { useEffect, useState } from "react";
import { useGlobalContextProvider } from "@/app/contextAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

interface Categoria {
  id: number;
  nome: string;
}

export function useCategorie() {
  const [list, setList] = useState<Categoria[]>([]);

  useEffect(() => {
    async function fetchCategorie() {
      try {
        const res = await fetch('/api/categorie');
        const data = await res.json();
        if (Array.isArray(data)) {
          setList(data); // mettiamo direttamente gli oggetti completi
        } else {
          // fallback locale: array di oggetti
          setList([{ id: 1, nome: "do" }, { id: 2, nome: "todo" }]);
        }
      } catch {
        setList([{ id: 1, nome: "do" }, { id: 2, nome: "todo" }]);
      }
    }

    fetchCategorie();
  }, []);

  return { list, setList };
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
        {categorie.list.map((category, index) => (
  <CategoriesCard
    key={index}               // uso dell'indice come key
    categoryName={category.nome}  // passo solo il nome come stringa
    onOpenDropDown={handleOpenDropDown}
    isDark={isDark}
  />
))}

      </div>
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

export default CategoriesArea;
