"use client";

import { useState } from "react";

export default function NavBar() {
  // mostra os links do header
  const [navToggle, setNavToggle] = useState(false);

  const handlerNavToggle = () => {
    setNavToggle((old) => !old);
  };
  const navBarLinks = [
    {
      title: "site oficial",
      link: "https://mhsbarbershop.vercel.app",
      target: "_blank",
    },
    {
      title: "menu",
      link: "#BSmenu",
    },
    {
      title: "horarios",
      link: "#BShours",
    },
    {
      title: "endereço",
      link: "#BSaddress",
    },
    {
      title: "contato",
      link: "#BSaddress",
    },
  ];
  return (
    <div className="flex items-center">
      <div
        onClick={handlerNavToggle}
        className={`${
          navToggle ? "mobile:h-full mobile:pt-8" : "mobile:h-0"
        } mobile:w-full  mobile:z-10 overflow-hidden mobile:bg-neutral-800 mobile:fixed top-0 right-0 flex mobile:flex-col items-center mobile:gap-0 gap-10 text-xl mobile:text-2xl text-center transition-all`}
      >
        {navBarLinks.map((link) => (
          <a
            className="BSlink capitalize mobile:w-full mobile:py-5 mobile:text-2xl text-center "
            href={link.link}
            target={link.target}
          >
            {link.title}
          </a>
        ))}
      </div>

      <div
        onClick={handlerNavToggle}
        className="mobile:abolute w-10 h-8 top-1 right-2 z-20 flex flex-col justify-around"
      >
        <div
          className={`${
            navToggle ? "rotate-45 translate-y-[10px]" : ""
          } BSline`}
        ></div>
        <div className={`${navToggle ? "hidden" : ""} BSline`}></div>
        <div
          className={`${
            navToggle ? "-rotate-45 -translate-y-[6px]" : ""
          } BSline`}
        ></div>
      </div>
    </div>
  );
}
