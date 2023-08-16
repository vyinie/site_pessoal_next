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
        className={`${navToggle ? "mobile:w-full" : "mobile:w-0"} flex gap-10 text-xl`}
      >
        <a className="BSlink" href="#BSmenu">
          menu
        </a>
        <a className="BSlink" href="#BShours">
          horarios
        </a>
        <a className="BSlink" href="#BSaddress">
          endereço
        </a>
        <a className="BSlink" href="#BSaddress">
          contato
        </a>
      </div>

      <div onClick={handlerNavToggle} className="BSnavToggle">
        <div className={`${navToggle ? "" : ""} BSline`}></div>
        <div className={`${navToggle ? "" : ""} BSline`}></div>
        <div className={`${navToggle ? "" : ""} BSline`}></div>
      </div>
    </div>
  );
}
