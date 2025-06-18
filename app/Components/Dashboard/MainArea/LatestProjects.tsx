import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faProjectDiagram } from "@fortawesome/free-solid-svg-icons/faProjectDiagram";
import { faBarsProgress } from "@fortawesome/free-solid-svg-icons/faBarsProgress";
import { useGlobalContextProvider } from "@/app/contextAPI";
import CubePlusIcon from "@/app/assets/svgs/svgIcons"

export default function LatestProjects() {
    const { isDark, setIsDark } = useGlobalContextProvider();
    const projects: any = [];
    return (
        <div
            className={`rounded-xl p-6 flex flex-col items-center gap-4 shadow-2xl
        ${isDark ? "bg-[#161d3a]" : "bg-white"}`}>

            <span className={`font-semibold text-center text-lg ${isDark ? "text-white" : "text-gray-900"}`}>
                Progetti
            </span>
            <div className="flex gap-4 flex-col">
                {projects.length > 0 ? (
                    projects.map((project: any, projectIndex: number) => (
                        <div key={projectIndex}>
                            <ProjectCard />
                        </div>
                    ))
                ) : (
                    <EmptyProjectsPlaceholder />
                )}
            </div>
        </div>
    );
}

function ProjectCard() {
    const { isDark, setIsDark } = useGlobalContextProvider();
    return (
        <div
            className={`${isDark ? "bg-blackColor" : "bg-slate-100"
                } w-full py-5 rounded-md p-4 text-sm flex flex-col gap-6`}>
            {/* PROJECT NAME ICON */}
            <div className="flex gap-2 items-center">
                <FontAwesomeIcon
                    className="bg-mainColor p-2 text-white rounded-full w-[12px] h-[12px]"
                    height={10}
                    width={10}
                    icon={faProjectDiagram}
                />

                <span className="">Progetto 1</span>
            </div>
            {/* PROGRESS */}
            <div className="flex flex-col gap-2">
                <div
                >
                    className={`${isDark ? "text-white" : "text-gray-500"

                        } flex justify-between items-center text-[12px]`}
                    <div className="flex gap-2 items-center ">
                        <FontAwesomeIcon height={12} width={12} icon={faBarsProgress} />
                        <span>Progresso</span>

                    </div>
                    <span>9/12</span>
                </div>
                <div className="w-full h-[5px] rounded-2xl bg-gray-400 overflow-hidden">
                    <div className="w-1/2 h-full bg-mainColor rounded-r-lg"> </div>
                </div>
            </div>
        </div>
    );
}

function EmptyProjectsPlaceholder() {
    const { isDark, setIsDark } = useGlobalContextProvider();
    return (
        <div className="p-1 gap-5 flex flex-col justify-center items-center text-center">
            <CubePlusIcon width={120} height={120} color="#d4d4d4" />

            <div className="flex flex-col items-center">
                <h3 className={`font-semibold text-lg mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                    Vuoto
                </h3>
                <p className={`text-sm w-52 ${isDark ? "text-white" : "text-gray-900"}`}>
                    Clicca per aggiungere Progetti
                </p>
            </div>

            <button className="bg-gradient-to-t from-[#2c67f2] to-[#62cff4] p-3 rounded-md text-white text-center text-sm px-7">
                Aggiungi progetto
            </button>
        </div>
    );

}
