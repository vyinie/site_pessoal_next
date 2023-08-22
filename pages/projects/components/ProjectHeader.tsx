import BackIcon from "./global/BackIcon";

// header exclusivo dos projetos
const ProjectHeader = ({ title }: { title: string }) => {
  return (
    <div className="template_header flex justify-center items-center bg-gray-200 relative">
      <BackIcon className="h-12 w-20" />
      <h1 className="text-4xl">{title}</h1>
    </div>
  );
};

export default ProjectHeader;
