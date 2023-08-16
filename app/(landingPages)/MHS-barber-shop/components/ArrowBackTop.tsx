'use client'
import { useEffect, useState } from "react";

export function ArrowBackTop() {
    const [scroll, setScroll] = useState(window.scrollY > 300);
  
    document.addEventListener("scroll", () => {
      localStorage.setItem("BSscroll", window.scrollY.toString());
  
      if (window.scrollY > 300) {
        setScroll(() => true);
      } else {
        setScroll(() => false);
      }
    });
    useEffect(() => {
      const y = Number(localStorage.getItem("BSscroll"));
      window.scrollY = y;
    }, []);
  
    return (
      <a
        href="#BShome"
        className={`${
          scroll ? "flex" : "hidden"
        } w-12 h-12 bg-yellow-400 rounded-full fixed bottom-10 right-10 z-10 cursor-pointer`}
      >
        <div className="w-5 h-5 bg-fuchsia-900 border-l-4 border-t-4 rotate-45"></div>
      </a>
    );
  }
  