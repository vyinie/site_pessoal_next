import BackIcon from "./BackIcon";

// header exclusivo dos projetos
const ProjectHeader = ({ title }: { title: string }) => {
  return (
    <div className="w-full h-14 flex justify-center items-center bg-yellow-100 relative">
      <BackIcon className="h-12" />
      <h1 className="text-4xl">{title}</h1>
    </div>
  );
};

export default ProjectHeader;
