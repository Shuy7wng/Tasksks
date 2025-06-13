import {
  faDiagramProject,
  faLayerGroup,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContextProvider } from "@/app/contextAPI";

interface statisticsCard {
  text: string;
  numbers: number;
  icon: any;
}

export default function Statistics() {
  const statisticsCard: statisticsCard[] = [
    { text: "Total Projects", numbers: 15, icon: faDiagramProject },
    { text: "Tasks Completed", numbers: 30, icon: faListCheck },
    { text: "Categories", numbers: 3, icon: faLayerGroup },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {statisticsCard.map((singleCard, index) => (
        <Card key={index} singleCard={singleCard} />
      ))}
    </div>
  );
}

function Card({ singleCard }: { singleCard: statisticsCard }) {
  const { text, numbers, icon } = singleCard;

  return (
    <div className="flex items-center justify-between bg-[#006fb4] text-white p-4 px-6 rounded-lg shadow w-[260px]">
      {/* Info */}
      <div className="flex flex-col">
        <span className="text-2xl font-bold">{numbers}</span>
        <span className="text-sm font-medium">{text}</span>
      </div>

      {/* Icona cerchiata */}
      <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
        <FontAwesomeIcon icon={icon} className="text-[#006fb4] text-lg" />
      </div>
    </div>
  );
}
