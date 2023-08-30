"use client";
import "./styles.css";

import ProjectHeader from "../../components/ProjectHeader";
import ColorsPanel from "./components/LayoutColors";

import { useEffect, useState } from "react";

import { ColoRGBBlock } from "@/functions/interfaces";
import { colorRandom, randomNumber } from "@/functions/randomizers";
import ColoRGBLifes from "./components/lifes";

export default function ColoRGB() {
  // lista de cores
  const [blocks, setBlocks] = useState<ColoRGBBlock[]>([
    { id: 0, colorCode: "" },
    { id: 1, colorCode: "" },
    { id: 2, colorCode: "" },
    { id: 3, colorCode: "" },
    { id: 4, colorCode: "" },
    { id: 5, colorCode: "" },
  ]);

  const [lifes, setLifes] = useState([0, 1, 2]);

  const [score, setScore] = useState({ score: 0, highScore: 0 });

  // cor verdadeira
  const [trueColor, setTrueColor] = useState("");

  /** reseta todas as cores e define a cor verdadeira */
  function changeColors() {
    blocks.map((i) => {
      const el = document.getElementById("color_block" + i.id)?.style || {
        backgroundColor: "",
      };
      el.backgroundColor = "";
    });

    const newTrueColor = colorRandom();
    const newBlocks = blocks.map((i) => ({ ...i, colorCode: colorRandom() }));

    newBlocks[randomNumber(5)].colorCode = newTrueColor;

    setTrueColor(() => newTrueColor);
    setBlocks(() => newBlocks);
  }

  /** eventos de um acerto */
  function rightMoveEvent() {
    changeColors();

    // add uma vida até encher
    if (lifes.length < 3) {
      setLifes((old) => [...old, old.length + 1]);
    }

    setScore((old) => ({
      ...old,
      score: old.score + 100 * lifes.length,
    }));
  }

  /** eventos de um erro */
  function wrongMoveEvent(itemData: ColoRGBBlock) {
    //
    if (lifes.length <= 1) {
      // apaga todos os blocos

      setLifes(() => []);
      blocks.map((i) => {
        //@ts-ignore
        const el = document.getElementById("color_block" + i.id).style;
        el.backgroundColor = "white";
      });

      setTimeout(() => {
        setLifes(() => [0, 1, 2]);

        changeColors();

        setScore((old) => ({ ...old, score: 0 }));
      }, 600);
    } else {
      // div da kase do respectivo bloco
      //@ts-ignore
      const el = document.getElementById("color_block" + itemData.id).style;
      el.backgroundColor = "white";
      //  remove uma vida
      setLifes((old) => old.slice(0, -1));
    }
  }

  /** define um evento para cada ação no painel de cores  */
  function checkMove(itemData: ColoRGBBlock) {
    // caso acerte
    if (itemData.colorCode === trueColor) {
      rightMoveEvent();

      // caso erre
    } else {
      wrongMoveEvent(itemData);
    }
  }

  useEffect(() => {
    if (score.score > score.highScore) {
      setScore((old) => ({
        ...old,
        highScore: score.score,
      }));
      localStorage.setItem("color_rgb_data", JSON.stringify(score.score));
    }
  }, [score.score]);

  // inicia o jogo
  useEffect(() => {
    const storage = localStorage.getItem("color_rgb_data");

    if (!storage) {
      localStorage.setItem("color_rgb_data", "0");
    } else {
      const data = JSON.parse(storage);
      setScore((old) => ({ ...old, highScore: data }));
    }

    changeColors();
  }, []);

  return (
    <div className="template bg-slate-100">
      {/* header */}
      <ProjectHeader title="ColoRGB" />

      {/* sidebar */}
      <div className="template_side_bar border-r-2 border-zinc-400 justify-center">
        <div className="w-full h-fit py-2 mt-4 flex flex-col items-center text-2xl border-neutral-500 border-2 rounded-md">
          {score.score}
          <hr className="w-11/12 border-black" />
          {score.highScore}
        </div>
        <div className="w-full h-full flex justify-center gap-3">
          <ColoRGBLifes lifes={lifes} />
        </div>
      </div>

      {/* dashboard */}
      <div className="template_dashboard colorgb_dashboard place-items-center">
        {/* 
        painel que mostra a cor certa */}
        <div className=" w-60 h-12 grid place-items-center rounded-md border-2 bg-gray-200 border-zinc-400 text-center">
          <p className="text-3xl">{trueColor.slice(4, -1)}</p>
        </div>

        {/* painel das cores */}
        <ColorsPanel blocks={blocks} checkMove={checkMove} />
      </div>
    </div>
  );
}
