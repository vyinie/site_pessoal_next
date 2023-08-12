import BackIcon from "./BackIcon";


const ProjectHeader = ({title}) => {
  return (
    <div className="projectHeader">
      <BackIcon styles={{heigth:"50px"}}/>
      <h1 className="projectHeaderTitle">{title}</h1>
    </div>
  );
};

export default ProjectHeader;
