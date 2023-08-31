"use client";

import { ColoRGBBlock } from "@/functions/interfaces";

/** painel com as cores */
export default function ColorsPanel({
  blocks,
  checkMove,
  ezMode,
}: {
  ezMode: boolean;
  blocks: ColoRGBBlock[];
  checkMove: (itemData: ColoRGBBlock) => void;
}) {
  const panelBlocks = ezMode ? blocks.slice(0, -2) : blocks;
  return (
    <div className={`${ezMode ?'w-[240px] grid-cols-2':'w-[360px] mobile-sm:w-[240px] mobile-sm:h-[360px] mobile-sm:grid-rows-3 mobile-sm:grid-cols-2 grid-cols-3'} grid  grid-rows-2  self-start h-[240px] p-1 gap-1 border-2 border-neutral-400 rounded-md moblet:mt-12`}>
      {panelBlocks.map((i) => (
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
