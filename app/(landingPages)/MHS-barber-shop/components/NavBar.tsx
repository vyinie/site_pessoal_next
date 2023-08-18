"use client";

import { useState } from "react";

export function NavBar() {
  // mostra os links do header
  const [navToggle, setNavToggle] = useState(true);

  const handlerNavToggle = () => {
    setNavToggle((old) => !old);
  };
  return (
    <div className="flex items-center">
      <div
        onClick={handlerNavToggle}
        className={`${
          navToggle ? "mobile:h-full mobile:pt-8" : "mobile:h-0"
        } mobile:w-full  mobile:z-10 overflow-hidden mobile:bg-neutral-800 mobile:fixed top-0 right-0 flex mobile:flex-col items-center mobile:gap-0 gap-10 text-xl mobile:text-2xl text-center transition-all`}
      >
        <a className="BSlink mobile:w-full mobile:py-5 " href="#BSmenu">
          menu
        </a>
        <a
          className="BSlink mobile:w-full mobile:py-5 mobile:text-2xl text-center "
          href="#BShours"
        >
          horarios
        </a>
        <a
          className="BSlink mobile:w-full mobile:py-5 mobile:text-2xl text-center "
          href="#BSaddress"
        >
          endereço
        </a>
        <a
          className="BSlink mobile:w-full mobile:py-5 mobile:text-2xl text-center "
          href="#BSaddress"
        >
          contato
        </a>
      </div>

      <div
        onClick={handlerNavToggle}
        className="mobile:abolute w-14 h-12 top-1 right-2 z-20 flex flex-col justify-around"
      >
        <div className={`${navToggle ? "rotate-45 translate-y-[12px]" : ""} BSline`}></div>
        <div className={`${navToggle ? "hidden" : ""} BSline`}></div>
        <div className={`${navToggle ? "-rotate-45 -translate-y-[11px]" : ""} BSline`}></div>
      </div>
    </div>
  );
}
