"use client";

import { TDList } from "@/functions/interfaces";
import { Dispatch, SetStateAction } from "react";

export default function ToDoSideBar({
  mainList,
  setlistIndex,
  listIndex,
}: {
  mainList: TDList[];
  listIndex: number;
  setlistIndex: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="sideBarWrapper">
      <div className="template_side_bar grid justify-center border-r border-black bg-slate-100 w-full moblet:w-[270px]">
        {/* titulo */}
        <div className="flex items-center justify-center w-full h-full">
          <h1 className="text-2xl font-bold uppercase">
            {mainList[listIndex]?.title}
          </h1>
        </div>

        {/* opições */}
        <div className="w-full text-lg text-center capitalize">
          {mainList.map((i) => (
            <div
              onClick={() => setlistIndex(() => i.id)}
              key={`sideBarBtn${i.id}`}
              className="w-full py-2 border-b-2 border-zinc-500 bgHover  cursor-pointer"
            >
              {i.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
