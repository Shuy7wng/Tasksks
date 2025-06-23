"use client";

import { useEffect, useState } from "react";
import { useGlobalContextProvider } from "@/app/contextAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import DropDown from "../DropDown";

interface Categoria {
  id: number;
  nome: string;
}

// Assumo come è fatto Progetto
interface Progetto {
  id: number;
  nome: string;
}

// Conversione Categoria => Progetto finto
function categoriaToProgetto(cat: Categoria): Progetto {
  return {
    id: cat.id,
    nome: cat.nome,
  };
}

// Conversione Progetto => Categoria
function progettoToCategoria(proj: Progetto): Categoria {
  return {
    id: typeof proj.id === "string" ? parseInt(proj.id) : proj.id,
    nome: proj.nome,
  };
}

export function useCategorie() {
  const [list, setList] = useState<Categoria[]>([]);

useEffect(() => {
  async function fetchCategorie() {
    try {
      const res = await fetch("/api/categorie");
      const data = await res.json();
      if (Array.isArray(data)) {
        setList(data);
      } else {
        setList([]);    // ora lista vuota invece di “do”/“todo”
      }
    } catch {
      setList([]);      // anche in caso di errore, lista vuota
    }
  }

  fetchCategorie();
}, []);


  return { list, setList };
}

function CategoriesArea() {
  const { isDark, categorie, dropDown } = useGlobalContextProvider();
  const {
    openDropDown,
    setOpenDropDown,
    dropDownPosition,
    setDropDownPosition,
    setSelectedItem,
    selectedItem,
  } = dropDown;

  // Mantengo solo il resize (se necessario)
  const [currentWidth, setCurrentWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setCurrentWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleOpenDropDown(event: React.MouseEvent<HTMLDivElement>, item: Categoria) {
    event.stopPropagation();
    setOpenDropDown(true);
    setDropDownPosition({ x: event.clientX, y: event.clientY });
    setSelectedItem(item);
  }

  async function handleDelete(proj: Progetto) {
    const item = progettoToCategoria(proj);

    try {
      const res = await fetch(`/api/categorie?id=${item.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Errore eliminazione categoria");

      setOpenDropDown(false);
      categorie.setList(prev => prev.filter(c => c.id !== item.id));
    } catch (error) {
      console.error("Errore eliminazione:", error);
      alert("Errore eliminazione categoria");
    }
  }

  function handleEdit(proj: Progetto) {
    const item = progettoToCategoria(proj);
    console.log("Modifica categoria", item);
    setOpenDropDown(false);
    // Qui apri modale o altro per la modifica
  }

  return (
    <div className={`${isDark ? "bg-[#161d3a]" : "bg-slate-50"} p-8`}>
      <div
        className={`${isDark ? "bg-[#0e1324]" : "bg-slate-50"}  grid gap-4 p-6 rounded-md py-8 shadow-2xl`}
      >
        {categorie.list.length === 0 && (
          <p className={`${isDark ? "text-white" : "text-gray-700"}`}>Nessuna categoria disponibile</p>
        )}
        {categorie.list.map((category, index) => (
          <CategoriesCard
            key={category.id}
            category={category}
            onOpenDropDown={handleOpenDropDown}
            isDark={isDark}
          />
        ))}
      </div>

      {/* DropDown fuori dal blocco lista */}
      <DropDown<Progetto>
        open={openDropDown}
        position={dropDownPosition}
        onClose={() => setOpenDropDown(false)}
        onEdit={handleEdit}
        onDelete={handleDelete}
        selectedItem={
          selectedItem ? categoriaToProgetto(selectedItem as Categoria) : null
        }
        isDark={isDark}
      />
    </div>
  );
}

interface CategoriesCardProps {
  category: Categoria;
  onOpenDropDown: (event: React.MouseEvent<HTMLDivElement>, item: Categoria) => void;
  isDark: boolean;
}

function CategoriesCard({ category, onOpenDropDown, isDark }: CategoriesCardProps) {
  return (
    <div
      className={`${isDark ? "bg-[#161D3A]" : "bg-slate-100"} shadow-sm p-4 flex px-5 rounded-md 
                text-[14px] justify-between items-center`}
    >
      <div className="flex flex-col">
        <span className="font-semibold">{category.nome}</span>
        <span className="text-[12px] text-gray-400">2 progetti</span>
      </div>
      <div
        onClick={(e) => onOpenDropDown(e, category)}
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
