"use client";
import "./Projects.css";

import { useState } from "react";


import colorgb from "@/public/_images/projectsItems/games/coloRGB_kase.png";

import todo from "@/public/_images/projectsItems/apps/ToDo_kase.png";
import kanban from "@/public/_images/projectsItems/apps/kanban_kase.png";
import finnance from "@/public/_images/projectsItems/apps/finnance_kase.png";


import mhsBS from "@/public/_images/projectsItems/landingPages/mhsBS/mhsBS_kase.png";
import acAlma from "@/public/_images/projectsItems/landingPages/acAlma/acAlma_kase.png";

import emBreve from "@/public/_images/projectsItems/em-breve.png";

import ProjectsMenu from "./components/ProjectsMenu";
import Item from "./components/ProjectItem";

export default function Projects() {
  const projectsList = {
    // apps
    apps: [
      {
        title: "Finnance",
        des: "CRUD de controle financeiro, com banco de dados multi-tenancy",
        id: 3,
        link: "/finnance",
        img: finnance,
      },
      {
        title: "To Do List",
        des: "To Do List, o nome é bem objetivo",
        id: 1,
        link: "/to-do-list",
        img: todo,
      },
      {
        title: "Kanban",
        des: "tipo o To Do List, só que mais organizado",
        id: 2,
        link: "/kanban",
        img: kanban,
      },
    ],

    // landing pages
    LP: [
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
      },
      {
        title: "Em Breve",
        des: "Ainda em desenvolvimento",
        id: 6,
        link: "/",
        img: emBreve,
      },
      {
        title: "Em Breve",
        des: "Ainda em desenvolvimento",
        id: 7,
        link: "/",
        img: emBreve,
      },
    ],

    // games
    games: [
      {
        title: "ColoRGB",
        des: "Tente acertar a cor que representa o codigo RGB",
        id: 0,
        link: "/colorgb",
        img: colorgb,
      },
    ],
  };

  // ====================== diz a sessão atual ======================
  const [projectSelected, setProjectSelected] = useState("apps");

  function setMenuProjects(id: string, className: string) {
    const verify = className.split(" ").some((i) => i === "selectProjectBtn");
    if (verify) {
      setProjectSelected(() => id);
    }
  }

  return (
    <div className="w-full h-screen py-5 flex flex-col items-center">
      {/* titulo */}
      <div className="ml-12 self-start relative">
        <h1 className="text-[50px] before:absolute before:-bottom-1 before:w-32 before:h-2 before:bg-sky-500">
          Projetos
        </h1>
      </div>

      {/* menu */}
      <ProjectsMenu
        projectSelected={projectSelected}
        setMenuProjects={setMenuProjects}
      />

      {/* links */}
      <div className="max-w-[90%] w-fit min-h-[310px] max-h-screen flex flex-wrap justify-around gap-y-11 gap-x-10 bg-black bg-opacity-5 relative overflow-y-auto overflow-hidden mt-6 p-2 ">
        {projectsList[projectSelected].map((i) => (
          <Item
            id={`item${i.id}`}
            key={`item${i.id}`}
            title={i.title}
            des={i.des}
            link={i.link}
            img={i.img}
          />
        ))}
      </div>
    </div>
  );
}
