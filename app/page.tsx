import HomeIntro from "@/pagesComponents/home/Home";
import Projects from "@/pagesComponents/projects/Projects";

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
