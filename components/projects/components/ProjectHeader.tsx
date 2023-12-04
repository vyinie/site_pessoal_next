import BackIcon from "./global/BackIcon";

// header exclusivo dos projetos
const ProjectHeader = ({ title }: { title: string }) => {
  return (
    <div className="relative flex items-center justify-center bg-gray-200 template_header">
      <BackIcon className="w-16 h-12" />
      <h1 className="text-4xl">{title}</h1>
    </div>
  );
};

export default ProjectHeader;
