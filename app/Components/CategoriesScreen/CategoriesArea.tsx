"use client";

import React, { useEffect, useState } from "react";
import { useGlobalContextProvider, Categoria, Progetto } from "@/app/contextAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import DropDown from "../DropDown";

function CategoriesArea() {
  const { isDark, progetti, categorie, categoryDropDown } = useGlobalContextProvider();
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

  async function handleDelete(cat: Categoria) {
    try {
      const res = await fetch(`/api/categorie.php?id=${cat.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      setCatMenuOpen(false);
      categorie.setList(prev => prev.filter(c => c.id !== cat.id));
    } catch {
      alert("Errore eliminazione categoria");
    }
  }

  function handleEdit(cat: Categoria) {
    setCatMenuOpen(false);
    // apri modale modifica con cat
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

        {categorie.list.map(cat => {
          // conta progetti associati
          const count = progetti.filter((p: Progetto) =>
            p.categorie.some(c => c.id === cat.id)
          ).length;

          return (
            <div
              key={cat.id}
              className={`${isDark ? "bg-[#161d3a]" : "bg-slate-100"} shadow-sm p-4 flex justify-between items-center rounded-md`}
            >
              <div>
                <span className="font-semibold">{cat.nome}</span>
                <div className={`text-[12px] ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {count} {count === 1 ? "progetto" : "progetti"}
                </div>
              </div>
              <div
                onClick={e => handleOpen(e, cat)}
                className="p-1 hover:bg-gray-200 rounded-full cursor-pointer"
              >
                <FontAwesomeIcon icon={faEllipsis} className="text-gray-500" />
              </div>
            </div>
          );
        })}
      </div>

      <DropDown<Categoria>
        open={openCatMenu}
        position={catMenuPos}
        onClose={() => setCatMenuOpen(false)}
        selectedItem={selectedCat}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isDark={isDark}
      />
    </div>
  );
}

export default CategoriesArea;
