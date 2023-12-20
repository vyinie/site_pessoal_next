import BackIcon from "./BackIcon";

// header exclusivo dos projetos
const ProjectHeader = ({ title }: { title: string }) => {
  return (
    <div className="relative flex items-center justify-center bg-gray-200 template_header">
      <BackIcon />
      <h1 className="text-3xl">{title}</h1>
    </div>
  );
};

export default ProjectHeader;
