"use client";

import { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { ProjectItemProps } from "../Projects";

// link da area de projetos
export default function Item({ itemData }: { itemData: ProjectItemProps }) {
  // ============= mostra a descrição do projeto =============
  const [descToggle, setDescToggle] = useState(false);

  // ============= retorno =============
  return (
    <div className="w-[350px] transition text-center relative">
      <Link
        href={itemData.link}
        id={`itemBox${itemData.id}`}
        className="flex w-full h-56 mobile:h-52 mobile-sm:h-44 cursor-pointer text-black border-2 border-neutral-400 p-2 hover:p-0 rounded-md transition-all"
        target={itemData.target || ""}
      >
        <Image
          className="w-full h-full rounded"
          src={itemData.img}
          alt="coisa"
        />
      </Link>
      <div className="titleContainer">
        <p className="text-4xl">{itemData.title}</p>
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
        } w-full h-56 mobile:h-52 mobile-sm:h-44 flex items-center justify-center absolute top-0 text-center text-2xl text-white bg-black bg-opacity-70 transition`}
      >
        <p className="descText">{itemData.des}</p>
      </div>
    </div>
  );
}
