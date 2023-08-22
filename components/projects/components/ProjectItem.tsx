"use client";

import { useState } from "react";

import Link from "next/link";
import Image from "next/image";

// link da area de projetos
export default function Item({ title, des, id, link, img }) {
  // ============= mostra a descrição do projeto =============
  const [descToggle, setDescToggle] = useState(false);

  // ============= retorno =============
  return (
    <div className="w-[350px] transition text-center relative hover:scale-105">
      <Link
        href={link}
        id={`itemBox${id}`}
        className="flex w-full h-56 cursor-pointer text-black bg-black bg-opacity-5"
      >
        <Image className="w-full h-full" src={img} alt="coisa" />
      </Link>
      <div className="titleContainer">
        <p className="text-4xl">{title}</p>
        <span
          // mostra ou n a descrição
          onClick={() => setDescToggle(!descToggle)}
          onMouseOut={() => setDescToggle(false)}
          className="w-8 h-8 text-3xl italic font-bold font-serif border-2 border-black rounded-full flex items-center justify-center cursor-pointer"
        >
          i
        </span>
      </div>
      <div
        className={`${
          descToggle ? "z-10 opacity-100" : "-z-10 opacity-0"
        } w-full h-56 flex items-center justify-center absolute top-0 text-center text-3xl text-white bg-black bg-opacity-70 transition`}
      >
        <p className="descText">{des}</p>
      </div>
    </div>
  );
}
