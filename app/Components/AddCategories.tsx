"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContextProvider } from "@/app/contextAPI";

function AddCategorie() {
  const [nomeCategoria, setNomeCategoria] = useState("");
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [childWidth, setChildWidth] = useState(590);

  const { projectWindow, isDark, categorie } = useGlobalContextProvider();
  const { openNewCategorieBox, setOpenNewCategorieBox } = projectWindow;
  const sidebarWidth = 280;
  const childHeight = 300;

useEffect(() => {
  const calculatePosition = () => {
    const parentWidth = window.innerWidth;
    const parentHeight = window.innerHeight;

    const newChildWidth = parentWidth < 600 ? 340 : 570;
    setChildWidth(newChildWidth);

    const left = (parentWidth - newChildWidth) / 2;
    const top = (parentHeight - childHeight) / 2;

    setPosition({ left, top });
  };

  calculatePosition();

  window.addEventListener("resize", calculatePosition);
  return () => window.removeEventListener("resize", calculatePosition);
}, []);

  const aggiungiCategoria = async () => {
    if (nomeCategoria.trim() === "") {
      alert("Inserisci un nome per la categoria");
      return;
    }

    try {
      // Qui puoi fare la chiamata API POST
      // Simuliamo risposta con delay e aggiornamento contesto

      // Simulazione API (rimuovi se hai backend)
      await new Promise((r) => setTimeout(r, 500));
      const nuovaCategoria = nomeCategoria.trim();

      // Aggiorna lista nel contesto
      categorie.setList((prev) => [...prev, nuovaCategoria]);

      // Pulizia e chiusura
      setNomeCategoria("");
      setOpenNewCategorieBox(false);
    } catch (error) {
      alert("Errore: " + (error instanceof Error ? error.message : String(error)));
    }
  };

  if (!openNewCategorieBox) return null;

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: sidebarWidth,
          width: `calc(100vw - ${sidebarWidth}px)`,
          height: "100vh",
          backgroundColor: isDark ? "rgba(14, 19, 36, 0.3)" : "rgba(0,0,0,0.15)",
          zIndex: 30,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          left: `${position.left}px`,
          top: `${position.top}px`,
          width: `${childWidth}px`,
          height: `${childHeight}px`,
        }}
        className={`fixed p-6 py-7 rounded-lg flex flex-col z-40 shadow-lg transition-all
          ${isDark ? "bg-[#0e1324]" : "bg-white"}
          visible opacity-100
        `}
      >
        <div className="flex justify-between items-center">
          <span className="font-semibold text-[20px] mt-1">Nuova categoria</span>
          <FontAwesomeIcon
            onClick={() => setOpenNewCategorieBox(false)}
            className="opacity-30 cursor-pointer"
            icon={faClose}
          />
        </div>

        <div className="flex flex-col gap-2 mt-10 px-3">
          <span className="text-sm opacity-80">Nome categoria</span>
          <input
            className={`border w-full border-gray-200 outline-none p-3 rounded-md text-[12px] ${
              isDark ? "bg-[#161d3a]" : "bg-white"
            }`}
            placeholder="Dai un nome alla categoria..."
            value={nomeCategoria}
            onChange={(e) => setNomeCategoria(e.target.value)}
          />
        </div>

        <div className="text-center mx-2 mt-10">
          <button
            onClick={aggiungiCategoria}
            className="bg-gradient-to-tr from-[#2c67f2] to-[#62cff4] cursor-pointer w-full p-3 text-white rounded-md text-sm"
          >
            Aggiungi
          </button>
        </div>
      </div>
    </>
  );
}

export default AddCategorie;
