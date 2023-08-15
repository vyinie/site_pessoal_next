"use client";

import { useState } from "react";

export default function AcLinks() {
  const [navBarToggle, SetnavBarToggle] = useState(true);

  return (
    <span
      onClick={() => SetnavBarToggle((old) => !old)}
      className={`${
        navBarToggle ? "top-0" : "top-[-225px]"
      } flex gap-8 items-center cursor-pointer transition-all ACheaderLinks tablet:gap-4 mobile:absolute mobile:w-full mobile:flex-col left-0 mobile:text-xl mobile:bg-neutral-700 py-2 z-10 after:mobile:w-10 after:mobile:h-14 after:mobile:absolute after:mobile:bg-purple-550 after:mobile:top-full after:mobile:right-2 `}
    >
      <p>Home</p>
      <p>Serviços</p>
      <p>Contato</p>
      <p>Sobre</p>
    </span>
  );
}
