
import ProjectsTopBar from "./ProjectsTopBar";
import ProjectsArea from "./ProjectsArea";
import AddProjects from "../AddProjects";
import ProjectWindow from "./ProjectWindow/ProjectWindow";

function Projects() {
  return (
    <div className="h-full min-h-screen w-full">
      <AddProjects />
      <ProjectsTopBar />
      <ProjectsArea />
      <ProjectWindow />
    </div>
  );
}

export default Projects;
