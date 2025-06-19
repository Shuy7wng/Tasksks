import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPodcast, faClose } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContextProvider } from "@/app/contextAPI";

function AddProjects() {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [childWidth, setInnerWidth] = useState(590);
  const { projectWindow, isDark } = useGlobalContextProvider();
  const { openNewProjectBox, setOpenNewProjectBox } = projectWindow;
  const parentWidth = window.innerWidth;
  const parentHeight = window.innerHeight;
  const childHeight = 400;

  // Imposta larghezza sidebar fissa (o leggi da contesto se dinamica)
  const sidebarWidth = 280;

  useEffect(() => {
    const calculatePosition = () => {
      const left = (parentWidth - childWidth) / 2;
      const top = (parentHeight - childHeight) / 2;
      setPosition({ left, top });
    };
    calculatePosition();
    const handleResize = () => calculatePosition();

    if (parentWidth < 600) setInnerWidth(340);
    else setInnerWidth(570);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerWidth, window.innerHeight, childWidth, parentWidth, parentHeight]);

  return (
    <>
      {/* Overlay che oscura solo la parte a destra della sidebar */}
      {openNewProjectBox && (
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
      )}

      {/* Finestra popup */}
      <div
        style={{
          left: `${position.left}px`,
          top: `${position.top}px`,
          width: `${childWidth}px`,
          height: `${childHeight}px`,
        }}
        className={`
          ${openNewProjectBox ? "visible opacity-100" : "invisible opacity-0"} transition-all fixed p-6 py-7 rounded-lg flex flex-col z-40 shadow-lg
          ${isDark ? "bg-[#0e1324]" : "bg-white"}
        `}
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
              className={`border w-full border-gray-200 outline-none p-3 rounded-md text-[12px] ${
                isDark ? "bg-[#161d3a]" : "bg-white"
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
          <span className="text-sm opacity-80">Categoria</span>
          <select
            className={`p-3 cursor-pointer text-[13px] outline-none border rounded-md border-gray-200 ${
              isDark ? "bg-[#161d3a]" : "bg-white opacity-60"
            }`}
          >
            <option value="">Seleziona una categoria</option>
            <option value="option2">Category 1</option>
            <option value="option3">Category 2</option>
          </select>
        </div>

        {/* Bottone */}
        <div className="text-center mx-2 mt-10">
          <button className="bg-gradient-to-tr from-[#2c67f2] to-[#62cff4] cursor-pointer w-full p-3 text-white rounded-md text-sm">
            Aggiungi
          </button>
        </div>
      </div>
    </>
  );
}

export default AddProjects;
