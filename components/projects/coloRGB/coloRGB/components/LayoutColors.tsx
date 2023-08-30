"use client";

import { ColoRGBBlock } from "@/functions/interfaces";

/** painel com as cores */
export default function ColorsPanel({
  blocks,
  checkMove,
}: {
  blocks: ColoRGBBlock[];
  checkMove: (itemData: ColoRGBBlock) => void;
}) {
  return (
    <div className="grid grid-cols-3 grid-rows-2 self-start  w-[360px] h-[240px] p-1 gap-1 border-2 border-neutral-400 rounded-md">
      {blocks.map((i) => (
        <div
          key={"color_block" + i.id}
          style={{ backgroundColor: i.colorCode }}
          className=" w-full h-full rounded-md relative"
        >
          <div
            onClick={() => checkMove(i)}
            id={"color_block" + i.id}
            className="absolute w-full h-full hover:bg-black hover:bg-opacity-10 transition-all"
          ></div>
        </div>
      ))}
    </div>
  );
}
