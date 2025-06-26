import {
  faDiagramProject,
  faLayerGroup,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContextProvider } from "@/app/contextAPI";
import { useEffect, useState } from "react";

interface statisticsCard {
  text: string;
  numbers: number;
  icon: any;
}

export default function Statistics() {

  const { progetti, tasksContext, categorie, isDark } = useGlobalContextProvider();
  const { tasks } = tasksContext;

  const statisticsCard: statisticsCard[] = [
    { text: "Totale Progetti", numbers: progetti.length, icon: faDiagramProject },
    { text: "Totale Tasks", numbers: tasks.length, icon: faListCheck },
    { text: "Totale Categorie", numbers: categorie.list.length, icon: faLayerGroup },
  ];

  const [currentWidth, setCurrentWidth] = useState<number | null>(null);

  useEffect(() => {
    function handleResize() {
      setCurrentWidth(window.innerWidth);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (currentWidth === null) {
    return null;
  }

  return (
    <div
      className={`flex flex-nowrap overflow-x-auto gap-10 p-10 rounded-2xl shadow-2xl 
        ${isDark ? "bg-[#0e1324]" : "bg-white"
        }`}
    >
      {statisticsCard.map((singleCard, index) => (
        <Card
          key={index}
          singleCard={singleCard}
          currentWidth={currentWidth}
        />
      ))}
    </div>
  );
}

function Card({
  singleCard,
  currentWidth,
}: {
  singleCard: statisticsCard;
  currentWidth: number;
}) {
  const { text, numbers, icon } = singleCard;

  return (
    <div
      className={`flex flex-1 min-w-[200px] items-center justify-between text-white p-4 px-6 rounded-lg shadow-2xl 
      bg-gradient-to-tr from-[#2c67f2] to-[#62cff4]
    ${currentWidth < 1318 ? "gap-6" : "gap-11"}`}
    >
      <div className={`flex flex-col ${currentWidth < 750 ? "items-center" : ""}`}>
        <span className="font-bold text-2xl">{numbers}</span>
        <span className={`text-sm`}>
          {text}
        </span>
      </div>
      <div
        className={`h-12 w-12 rounded-full bg-white flex items-center justify-center ${currentWidth < 750 ? "hidden" : ""
          }`}
      >
        <FontAwesomeIcon icon={icon} className="text-[#2c67f2] text-lg" />
      </div>
    </div>
  );
}

