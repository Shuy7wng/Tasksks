"use client";

import React, { useState, useEffect, useRef } from "react";
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

  const inputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (openNewCategorieBox && inputRef.current) {
      inputRef.current.focus();
    }
  }, [openNewCategorieBox]);

  const aggiungiCategoria = async () => {
    if (nomeCategoria.trim() === "") {
      alert("Inserisci un nome per la categoria");
      return;
    }

    try {
      const res = await fetch("/api/categorie.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nomeCategoria.trim() }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert("Errore: " + errorData.error);
        return;
      }

      const nuovaCategoria = await res.json();

      // Aggiorna lista nel contesto (inserendo l'oggetto nuovo, non solo stringa)
      categorie.setList((prev) => [...prev, nuovaCategoria]);

      setNomeCategoria("");
      setOpenNewCategorieBox(false);
    } catch (error) {
      alert("Errore nella chiamata API: " + (error instanceof Error ? error.message : String(error)));
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
          pointerEvents: "auto",
        }}
        onClick={() => setOpenNewCategorieBox(false)}
        aria-label="Chiudi modale cliccando fuori"
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
        role="dialog"
        aria-modal="true"
        aria-labelledby="titolo-nuova-categoria"
      >
        <div className="flex justify-between items-center">
          <span id="titolo-nuova-categoria" className="font-semibold text-[20px] mt-1">Nuova categoria</span>
          <FontAwesomeIcon
            onClick={() => setOpenNewCategorieBox(false)}
            className="opacity-30 cursor-pointer"
            icon={faClose}
            role="button"
            aria-label="Chiudi modale"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setOpenNewCategorieBox(false);
            }}
          />
        </div>

        <div className="flex flex-col gap-2 mt-10 px-3">
          <label htmlFor="nome-categoria" className="text-sm opacity-80">Nome categoria</label>
          <input
            id="nome-categoria"
            ref={inputRef}
            className={`border w-full border-gray-200 outline-none p-3 rounded-md text-[12px] ${
              isDark ? "bg-[#161d3a]" : "bg-white"
            }`}
            placeholder="Dai un nome alla categoria..."
            value={nomeCategoria}
            onChange={(e) => setNomeCategoria(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="text-center mx-2 mt-10">
          <button
            onClick={aggiungiCategoria}
            className="bg-gradient-to-tr from-[#2c67f2] to-[#62cff4] cursor-pointer w-full p-3 text-white rounded-md text-sm"
            aria-label="Aggiungi categoria"
          >
            Aggiungi
          </button>
        </div>
      </div>
    </>
  );
}

export default AddCategorie;
