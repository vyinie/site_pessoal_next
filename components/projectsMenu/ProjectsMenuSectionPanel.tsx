"use client";

import { ProjectListProps } from ".";

export function ProjectsMenuSectionPanel({
  projectsList,
  changeProjectMenuSection,
}: {
  projectsList: ProjectListProps[];
  changeProjectMenuSection: (sectionId: number) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 px-2 mt-12 text-3xl">
      {projectsList.map((projectListData) => (
        <span
          key={`projectLink${projectListData.id}`}
          onClick={() => changeProjectMenuSection(projectListData.id)}
          data-selected={projectListData.selected}
          className={`data-[selected=true]:border-b-sky-500 border-b-transparent selectProjectBtn`}
        >
          {projectListData.title}
        </span>
      ))}
    </div>
  );
}
