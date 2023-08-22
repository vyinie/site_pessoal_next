import HomeIntro from "@/components/home/Home";
import Projects from "@/components/projects/Projects";

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
