"use client";

import React, { useEffect, useState } from "react";
import { useGlobalContextProvider, Categoria } from "@/app/contextAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import DropDown from "../DropDown";

interface Progetto {
  id: number;
  nome: string;
}

export function useCategorie() {
  const [list, setList] = useState<Categoria[]>([]);

  useEffect(() => {
    async function fetchCategorie() {
      try {
        const res = await fetch("/api/categorie");
        const data = await res.json();
        setList(Array.isArray(data) ? data : []);
      } catch {
        setList([]);
      }
    }

    fetchCategorie();
  }, []);

  return { list, setList };
}

function CategoriesArea() {
  const { isDark, categorie, categoryDropDown } = useGlobalContextProvider();
  const {
    open: openCatMenu,
    position: catMenuPos,
    selectedItem: selectedCat,
    setOpen: setCatMenuOpen,
    setPosition: setCatMenuPos,
    setSelectedItem: setCatSelected,
  } = categoryDropDown;

  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    function onResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function handleOpen(event: React.MouseEvent<HTMLDivElement>, cat: Categoria) {
    event.stopPropagation();
    setCatSelected(cat);
    setCatMenuPos({ x: event.clientX, y: event.clientY });
    setCatMenuOpen(true);
  }

  async function handleDelete(proj: Progetto) {
    const cat = { id: proj.id, nome: proj.nome };
    try {
      const res = await fetch(`/api/categorie?id=${cat.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      setCatMenuOpen(false);
      categorie.setList((prev) => prev.filter((c) => c.id !== cat.id));
    } catch {
      alert("Errore eliminazione categoria");
    }
  }

  function handleEdit(proj: Progetto) {
    const cat = { id: proj.id, nome: proj.nome };
    console.log("Modifica categoria", cat);
    setCatMenuOpen(false);
    // apri modale modifica
  }

  return (
    <div className={`${isDark ? "bg-[#161d3a]" : "bg-slate-50"} p-8`}>
      <div
        className={`grid gap-4 p-6 rounded-md py-8 shadow-2xl ${
          isDark ? "bg-[#0e1324]" : "bg-white"
        }`}
      >
        {categorie.list.length === 0 && (
          <p className={`${isDark ? "text-white" : "text-gray-700"}`}>
            Nessuna categoria disponibile
          </p>
        )}

        {categorie.list.map((cat) => (
          <div
            key={cat.id}
            className={`${isDark ? "bg-[#161d3a]" : "bg-slate-100"} shadow-sm p-4 flex justify-between items-center rounded-md`}
          >
            <span className="font-semibold">{cat.nome}</span>
            <div
              onClick={(e) => handleOpen(e, cat)}
              className="p-1 hover:bg-gray-200 rounded-full cursor-pointer"
            >
              <FontAwesomeIcon icon={faEllipsis} className="text-gray-500" />
            </div>
          </div>
        ))}
      </div>

      <DropDown<Progetto>
        open={openCatMenu}
        position={catMenuPos}
        onClose={() => setCatMenuOpen(false)}
        selectedItem={selectedCat ? { id: selectedCat.id, nome: selectedCat.nome } : null}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isDark={isDark}
      />
    </div>
  );
}

export default CategoriesArea;
