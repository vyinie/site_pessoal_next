import HomeIntro from "@/components/home/Home";
import Projects from "@/components/projects/Projects";
import { getPageFiles } from "next/dist/server/get-page-files";

export default async function Home() {
  return (
    <div>
        {/* intro session */}
        <HomeIntro />

        {/* projetos */}
        <Projects />
    </div>
  );
}
