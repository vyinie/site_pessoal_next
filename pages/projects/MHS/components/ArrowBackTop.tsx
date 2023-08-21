"use client";
import { useEffect, useState } from "react";

export function ArrowBackTop() {
  const [scroll, setScroll] = useState(window.scrollY > 300);
  document.addEventListener('scroll',() => {
    console.log(scroll);
    if (window.scrollY > 300) {
      setScroll(() => true);
    } else {
      setScroll(() => false);
    }
  });

  return (
    <a
      href="#BShome"
      className={`${
        scroll ? "" : ""
      } flex items-center justify-center w-12 h-12 bg-yellow-400 rounded-full fixed bottom-10 right-10 z-[2] cursor-pointer`}
    >
      <div className="w-5 h-5 border-fuchsia-900 border-l-4 mt-2 border-t-4 rotate-45"></div>
    </a>
  );
}
