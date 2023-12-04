import {HomeIntro} from "@/components/home";
import { ProjectsMenuSection } from "@/components/projectsMenu";

export default async function Home() {
  return (
    <div>
        {/* intro session */}
        <HomeIntro />

        {/* projetos */}
        <ProjectsMenuSection />
    </div>
  );
}
