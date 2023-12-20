"use client";
import "./styles.css";

import { useState } from "react";

import colorgb from "@/public/_images/projectsItems/games/coloRGB_kase.png";

import todo from "@/public/_images/projectsItems/apps/ToDo_kase.png";
import kanban from "@/public/_images/projectsItems/apps/kanban_kase.png";
import finnance from "@/public/_images/projectsItems/apps/finnance_kase.png";

import mhsBS from "@/public/_images/projectsItems/landingPages/mhsBS/mhsBS_kase.png";
import acAlma from "@/public/_images/projectsItems/landingPages/acAlma/acAlma_kase.png";

import emBreve from "@/public/_images/projectsItems/em-breve.png";

import { StaticImageData } from "next/image";
import {ProjectsMenuSectionPanel} from "./ProjectsMenuSectionPanel";
import ProjectMenuItem from "./ProjectMenuItem";

export interface ProjectMenuItemProps {
  title: string;
  des: string;
  id: number;
  link: string;
  img: StaticImageData;
  target?: "_blank";
}
export interface ProjectListProps {
  linksList: ProjectMenuItemProps[];
  title: string;
  id: number;
  selected: boolean;
}
export function ProjectsMenuSection() {
  /** list with all projects sections */
  const [projectsList, setProjectsList] = useState<ProjectListProps[]>([
    // apps
    {
      title: "apps",
      id: 0,
      selected: true,
      linksList: [
        /* {
          title: "Finnance",
          des: "CRUD de controle financeiro, com banco de dados multi-tenancy",
          id: 3,
          link: "/finnance",
          img: finnance,
        }, */
        {
          title: "Kanban",
          des: "tipo o To Do List, só que mais organizado",
          id: 2,
          link: "/kanban",
          img: kanban,
        },
        {
          title: "To Do List",
          des: "To Do List, o nome é bem objetivo",
          id: 1,
          link: "/to-do-list",
          img: todo,
        },
      ],
    },
    
    // landing pages
    {
      title: "landing pages",
      id: 1,
      selected: false,
      linksList: [
        {
          title: "acALMA",
          des: "landing page da newsletter de um curso de meditação, apenas HTML e CSS",
          id: 4,
          link: "/acalma",
          img: acAlma,
        },
        {
          title: "MHS Barber Shop",
          des: "site de barbearia",
          id: 5,
          link: "/MHS-barber-shop",
          img: mhsBS,
          // target:"_blank"
        },
        // {
        //   title: "Em Breve",
        //   des: "Ainda em desenvolvimento",
        //   id: 6,
        //   link: "/",
        //   img: emBreve,
        // },
      ],
    },

    // games
    {
      title: "jogos",
      id: 2,
      selected: false,
      linksList: [
        {
          title: "ColoRGB",
          des: "Tente acertar a cor que representa o codigo RGB",
          id: 0,
          link: "/colorgb",
          img: colorgb,
        },
      ],
    },
  ]);
  
  /** selected projects list */
  const selectedProjectsList = projectsList.find(
    (sectionsList) => sectionsList.selected
  )?.linksList;

  function changeProjectMenuSection(sectionId: number) {
    const oldListHolder = [...projectsList];

    oldListHolder.forEach((project) => (project.selected = false));

    oldListHolder.find(
      (project) => project.id === sectionId && (project.selected = true)
    );

    setProjectsList(oldListHolder);
  }

  return (
    <div className="w-full h-screen mobile:h-[150vh] py-5 flex flex-col items-center">
      {/* titulo */}
      <div className="relative self-start ml-12 mobile:ml-8">
        <h1 className="text-[50px] before:absolute before:-bottom-1 before:w-32 before:h-2 before:bg-sky-500">
          Projetos
        </h1>
      </div>

      {/* menu */}
      <ProjectsMenuSectionPanel
        projectsList={projectsList}
        changeProjectMenuSection={changeProjectMenuSection}
      />

      {/* links */}
      <div className="max-w-[90%] w-fit min-h-[310px] max-h-screen flex flex-wrap justify-around gap-y-11 gap-x-10 bg-black bg-opacity-5 relative overflow-y-auto overflow-hidden mt-6 p-2 ">
        {selectedProjectsList?.map((projectList) => (
          <ProjectMenuItem
            key={`projectMenuItem${projectList.id}`}
            itemData={projectList}
          />
        ))}
      </div>
    </div>
  );
}
