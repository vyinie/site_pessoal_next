"use client";
import "./styles.css";

import myPic from "/public/_images/home/FotinhaDaora.png";
import github from "/public/_images/contact/github.png";
import curriculo from "/public/_images/contact/curriculo.png";
import linkedin from "/public/_images/contact/linkedin.png";

import Image from "next/image";

import TextAnimation from "./TextAnimation";

export default function HomeIntro() {
  const links = [
    {
      link: "https://github.com/vyinie",
      img: github,
      alt: "GitHub",
    },
    {
      id: "linkedin",
      link: "https://linkedin.com/in/marcus-xavier-023008248",
      img: linkedin,
      alt: "LinkedIn",
    },
    {
      id: "curriculo",
      link: "/files/curriculo Marcus Xavier.pdf",
      img: curriculo,
      alt: "Curriculo",
      download: "curriculo_Marcus_Xavier",
    },
  ];
  return (
    <div className="w-screen h-screen flex flex-wrap justify-center content-center items-center gap-10">
      <Image
        className="min-w-[250px] min-h-[250px] w-[25vw] h-[25vw] rounded-full shadow-md animate-intro"
        src={myPic}
        alt="my_picture"
      />

      <div className="flex flex-col relative uppercase font-bold w-fit">
        <h1 className="title tracking-wide mobile-sm:tracking-tight w-fit">
          desenvolvedor
        </h1>

        <div className="subtitleContainer">
          <h1 className="text-sky-500 title mobile-sm:tracking-tight">react</h1>
          <TextAnimation />
        </div>

        <div className="w-full h-12 flex justify-around items-center mt-4 sm:mt-8">
          {links.map((i) => (
            <a
              target="_blank"
              key={i.id}
              href={i.link}
              className="w-12 h-12 moblet:w-14 moblet:h-14"
              title={i.alt}
              download
            >
              <Image className="imgLink" src={i.img} alt={i.alt} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

