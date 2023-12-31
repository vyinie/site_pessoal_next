"use client";
import { useEffect, useState } from "react";

export default function TextAnimation() {
  const [text, setText] = useState("");

  function escreve(t: string, i = 0) {
    i < t.length &&
      (setText(t.slice(0, i + 1)),
      setTimeout(() => {
        escreve(t, i + 1);
      }, 50));
  }

  useEffect(() => {
    setTimeout(() => {
      escreve("Me chamo Marcus e sou um web dev front-end");
    });
  }, []);
  return <p className="leading-7 w-fit sub">{text}</p>;
}
