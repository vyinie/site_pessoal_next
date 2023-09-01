"use client";

import { KanbanCard } from "@/functions/interfaces";
import KbCardMoreOpts from "./KbCardMoreOpts";

const KbCard = ({ cardData }: { cardData: KanbanCard }) => {
  return (
    <div
      style={{ backgroundColor: cardData.color }}
      className={`min-w-[180px] h-fit w-full text-3xl rounded-md p-1 flex flex-col items-center `}
    >
      {/* header */}
      <div className="h-10 w-full flex justify-center items-center relative">
        {cardData.name}
        <KbCardMoreOpts />
      </div>
    </div>
  );
};

export default KbCard;
