"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPodcast, faClose } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContextProvider } from "@/app/contextAPI";
import MultipleSelectChip from "./Multiselection";

function AddProjects() {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState<string[]>([]);
  const [categorie, setCategorie] = useState<{ id: number; nome: string }[]>([]);

  const { projectWindow, isDark } = useGlobalContextProvider();
  const {
    openNewProjectBox,
    setOpenNewProjectBox,
    refreshProjects,
    setRefreshProjects,
  } = projectWindow;

  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [childWidth, setChildWidth] = useState(590);
  const childHeight = 400;
  const sidebarWidth = 280;

  useEffect(() => {
    async function fetchCategorie() {
      try {
        const res = await fetch("/api/categorie");
        if (!res.ok) throw new Error("Errore caricamento categorie");
        const data = await res.json();
        setCategorie(data);
      } catch (error) {
        console.error(error);
        alert("Errore caricamento categorie. Controlla console.");
      }
    }
    fetchCategorie();
  }, []);

  useEffect(() => {
    function calculatePosition() {
      const parentWidth = window.innerWidth;
      const parentHeight = window.innerHeight;
      if (parentWidth < 600) setChildWidth(340);
      else setChildWidth(590);

      const left = (parentWidth - childWidth) / 2;
      const top = (parentHeight - childHeight) / 2;
      setPosition({ left, top });
    }

    calculatePosition();
    window.addEventListener("resize", calculatePosition);
    return () => window.removeEventListener("resize", calculatePosition);
  }, [childWidth]);

  function handleCategorieChange(value: string[]): void {
    setCategoria(value);
  }

  const handleAggiungiProgetto = async () => {
    if (!nome.trim() || categoria.length === 0) {
      alert("Inserisci nome e seleziona almeno una categoria.");
      return;
    }

    try {
      const categoriaId = categorie.find((c) => c.nome === categoria[0])?.id;
      if (!categoriaId) {
        alert("Categoria non valida.");
        return;
      }

      const res = await fetch("/api/progetti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          categoriaIds: categoria
            .map((nomeCat) => categorie.find((c) => c.nome === nomeCat)?.id)
            .filter((id): id is number => id !== undefined),
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(`Errore: ${error.error}`);
        return;
      }

      const data = await res.json();
      console.log("Progetto salvato:", data);

      setNome("");
      setCategoria([]);
      setOpenNewProjectBox(false);
      setRefreshProjects((prev) => !prev);
    } catch (err) {
      console.error("Errore nella richiesta:", err);
      alert("Errore durante la creazione del progetto.");
    }
  };

  if (!openNewProjectBox) return null;

  return (
    <>
      {/* Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: sidebarWidth,
          width: `calc(100vw - ${sidebarWidth}px)`,
          height: "100vh",
          backgroundColor: isDark
            ? "rgba(14, 19, 36, 0.3)"
            : "rgba(0,0,0,0.15)",
          zIndex: 30,
          pointerEvents: "none",
        }}
      />

      {/* Popup */}
      <div
        style={{
          left: `${position.left}px`,
          top: `${position.top}px`,
          width: `${childWidth}px`,
          height: `${childHeight}px`,
        }}
        className={`fixed p-6 py-7 rounded-lg flex flex-col z-40 shadow-lg transition-all
          ${openNewProjectBox ? "visible opacity-100" : "invisible opacity-0"}
          ${isDark ? "bg-[#0e1324]" : "bg-white"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <span className="font-semibold text-[20px] mt-1">Nuovo progetto</span>
          <FontAwesomeIcon
            onClick={() => setOpenNewProjectBox(false)}
            className="opacity-30 cursor-pointer"
            icon={faClose}
          />
        </div>

        {/* Nome progetto */}
        <div className="flex flex-col gap-2 mt-10 px-3">
          <span className="text-sm opacity-80">Nome progetto</span>
          <div className="flex gap-4 justify-between items-center">
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className={`border w-full border-gray-200 outline-none p-3 rounded-md text-[12px] ${isDark ? "bg-[#161d3a]" : "bg-white"
                }`}
              placeholder="Dai un nome al tuo progetto..."
            />
            <FontAwesomeIcon
              className="bg-gradient-to-tr from-[#2c67f2] to-[#62cff4] cursor-pointer mt-[1px] p-3 rounded-md text-white"
              icon={faPodcast}
              height={15}
              width={20}
            />
          </div>
        </div>

        {/* Categoria */}
        <div className="flex flex-col gap-2 mt-8 mx-3">
          <MultipleSelectChip
            selectedCategories={categorie}
            onSelectionChange={handleCategorieChange}
          />
        </div>

        {/* Bottone */}
        <div className="text-center mx-2 mt-10">
          <button
            onClick={handleAggiungiProgetto}
            className="bg-gradient-to-tr from-[#2c67f2] to-[#62cff4] cursor-pointer w-full p-3 text-white rounded-md text-sm"
          >
            Aggiungi
          </button>
        </div>
      </div>
    </>
  );
}

export default AddProjects;
