import HomeIntro from "@/pages/home/Home";
import Projects from "@/pages/projects/Projects";

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
