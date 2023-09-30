"use client";

import { useState } from "react";

export default function AcLinks() {
  const [navBarToggle, SetnavBarToggle] = useState(true);

  return (
    <span
      onClick={() => SetnavBarToggle((old) => !old)}
      className={`${
        navBarToggle ? "top-0" : "top-[-225px] tablet-sm:top-[-175px]"
      } flex gap-8 items-center cursor-pointer transition-all ACheaderLinks tablet:gap-4 mobile:absolute mobile:w-full mobile:flex-col left-0 mobile:text-xl mobile:bg-neutral-700 py-2 z-10 after:mobile:w-10 after:mobile:h-14 after:mobile:absolute after:mobile:bg-purple-550 after:mobile:top-full after:mobile:right-2 tablet-sm:absolute tablet-sm:w-full tablet-sm:flex-col tablet-sm:text-xl tablet-sm:bg-neutral-700 after:tablet-sm:w-10 after:tablet-sm:h-14 after:tablet-sm:absolute after:tablet-sm:bg-purple-550 after:tablet-sm:top-full after:tablet-sm:right-2`}
    >
      <p>Home</p>
      <p>Serviços</p>
      <p>Contato</p>
      <p>Sobre</p>
    </span>
  );
}
