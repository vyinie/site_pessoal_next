"use client";
import "./styles.css";

import { useEffect, useState } from "react";

import ProjectHeader from "../../commonComponents/ProjectHeader";

import { ColoRGBBlock, ColorDIficultControl } from "@/functions/interfaces";
import { colorRandom, randomNumber } from "@/functions/randomizers";

import ColorsPanel from "./components/ColorgbColorPanel";
import ColoRGBLifes from "./components/lifes";
import {
  DificultControl,
  DificultControlMobile,
} from "./components/ColorgbDificultControl";
import ColorgbScore from "./components/ColorgbScore";

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

  const [DiffControlToggle, setDiffControlToggle] = useState(false);

  const [dificultModes, setDificultModes] = useState<ColorDIficultControl[]>([
    { text: "noob", setted: false, lifes: [0, 1, 2], blocks: 3 },
    { text: "normal", setted: true, lifes: [0, 1, 2], blocks: 5 },
    { text: "difícil", setted: false, lifes: [0], blocks: 5 },
  ]);

  /** reseta todas as cores e define a cor verdadeira */
  function changeColors(blocksNum?: number) {
    blocks.map((i) => {
      const el = document.getElementById("color_block" + i.id)?.style || {
        backgroundColor: "",
      };
      el.backgroundColor = "";
    });

    const newTrueColor = colorRandom();
    const newBlocks = blocks.map((i) => ({ ...i, colorCode: colorRandom() }));

    newBlocks[randomNumber(blocksNum || 5)].colorCode = newTrueColor;

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
        const el = document.getElementById("color_block" + i.id);
        if (el) {
          el.style.backgroundColor = "white";
        }
      });

      const index = dificultModes.findIndex((i) => i.setted);
      setTimeout(() => {
        setLifes(() => dificultModes[index].lifes);

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

  /** muda a dificuldade */
  function setDificult(itemData: ColorDIficultControl) {
    // muda o arr de dificuldade
    const newList = dificultModes.map((i) => ({ ...i, setted: false }));
    const index = newList.findIndex((i) => i.text === itemData.text);

    newList[index].setted = true;
    setDificultModes(() => newList);

    // mostra as mudanças
    setLifes(() => itemData.lifes);
    changeColors(dificultModes[index].blocks);
    setScore((old) => ({ ...old, score: 0 }));
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
      <div
        className={`moblet:hidden template_side_bar border-r-2 border-zinc-400 justify-center transition-all bg-slate-100`}
      >
        {/* score */}
        <ColorgbScore score={score} />

        <div className="w-full h-full py-5 flex flex-col items-center gap-3">
          <ColoRGBLifes lifes={lifes} />
          <DificultControl
            setDificult={setDificult}
            dificultModes={dificultModes}
          />
        </div>
      </div>

      {/* dashboard */}
      <div className="template_dashboard colorgb_dashboard place-items-center">
        {/* 
        painel que mostra a cor certa */}
        <div className=" w-60 mobile-sm:w-52 mobile-sm:ml-3 h-12 grid place-items-center rounded-md border-2 bg-gray-200 border-zinc-400 text-center relative moblet:mt-8">
          <div className="moblet:flex hidden absolute -left-14 -top-8">
            <ColoRGBLifes lifes={lifes} />
          </div>

          <p className="text-3xl ">{trueColor.slice(4, -1)}</p>

          <DificultControlMobile
            DiffControlToggle={DiffControlToggle}
            setDiffControlToggle={setDiffControlToggle}
            dificultModes={dificultModes}
            setDificult={setDificult}
          />
        </div>

        {/* painel das cores */}
        <div className="w-full h-full pb-[60px] flex flex-col items-center bg-slate-100">
          <ColorsPanel
            ezMode={dificultModes[0].setted}
            blocks={blocks}
            checkMove={checkMove}
          />
          <div className="w-[200px]  moblet:block hidden">
            <ColorgbScore score={score} />
          </div>
        </div>
      </div>
    </div>
  );
}
