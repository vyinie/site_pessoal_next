"use client";

import Link from "next/link";
import Image from "next/image";
import { ProjectMenuItemProps } from ".";
import { InfoOutlined } from "@mui/icons-material";

// link da area de projetos
export default function ProjectMenuItem({
  itemData,
}: {
  itemData: ProjectMenuItemProps;
}) {
  return (
    <div className="w-[350px] h-[218px] transition text-center relative">
      <Link
        href={itemData.link}
        id={`itemBox${itemData.id}`}
        className="flex w-full h-full p-2 text-black transition-all border-2 rounded-md cursor-pointer mobile:h-52 mobile-sm:h-44 border-neutral-400 hover:p-0"
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

        <InfoOutlined className="text-3xl cursor-pointer peer" />
      <div
        className={`peer-hover:z-10 peer-hover:opacity-100 -z-10 opacity-0 w-full h-56 mobile:h-52 mobile-sm:h-44 flex items-center justify-center absolute top-0 text-center text-2xl text-white bg-black bg-opacity-70 transition`}
        >
        <p className="descText">{itemData.des}</p>
        </div>
      </div>
    </div>
  );
}
