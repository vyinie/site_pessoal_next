"use client";

import { accessibility } from "@/functions/accessibilityFunctions";
import { TDList } from "@/functions/interfaces";
import { Dispatch, SetStateAction, useState } from "react";
import ToDoListMoreOpt from "../dashboard/ToDoMoreOpt";
import {
  AddBtn,
  HamburgerBtn,
} from "@/components/projects/components/global/buttons";
import ToDoAddListBtn from "./ToDoAddListBtn";
import SideBarListBtn from "./SideBarListBtn";

const Access = new accessibility();

export default function ToDoSideBar({
  mainList,
  setlistIndex,
  listIndex,
  setMainList,
}: {
  mainList: TDList[];
  listIndex: number;
  setlistIndex: Dispatch<SetStateAction<number>>;
  setMainList: Dispatch<SetStateAction<TDList[]>>;
}) {
  const [sideBarToggle, setsideBarToggle] = useState(false);

  function handlerSideBar(e) {
    Access.handlerWrapper(e, setsideBarToggle);
  }

  return (
    <>
      <div className="moblet:z-20 -z-10 fixed top-[10px] right-2 ">
        <HamburgerBtn func={handlerSideBar} />
      </div>
      <div
        onClick={(e) => Access.closeWrapper(e, setsideBarToggle)}
        className={`${
          sideBarToggle
            ? "moblet:z-10 moblet:opacity-100"
            : "moblet:-z-10 moblet:opacity-0"
        } side_bar_wrapper close-on-click w-full h-full`}
      >
        <div
          className={`${
            sideBarToggle ? "moblet:mt-0" : "moblet:-ml-64"
          } template_side_bar w-full h-full grid justify-center border-r border-black bg-slate-100 moblet:w-[270px] transition-all`}
        >
          {/* titulo */}
          <div className="flex items-center justify-center w-full h-full">
            <h1 className="text-2xl font-bold uppercase overflow-hidden text-ellipsis ">
              {mainList[listIndex]?.title}
            </h1>
          </div>

          {/* opições */}
          <div className="flex flex-col w-full text-lg text-center capitalize">
            <ToDoListMoreOpt
              currentList={mainList[listIndex]?.list}
              listIndex={listIndex}
              setMainList={setMainList}
              isOpen
              className="mobile-sm:flex mobile-sm:w-[120px] hidden static h-fit self-center justify-self-center gap-3 mobile-sm:-mb-5"
              vert
              /*
            esse state não sera usado aqui, é uma exigencia do componente.
            ha outras formas de fazer essa exigencia relativa, mas dessa
            forma o componente fica menos sujo  
            */
              setVert={setsideBarToggle}
            />
            <ToDoAddListBtn mainList={mainList} setMainList={setMainList} />
            <div className="h-[60vh] overflow-hidden overflow-y-auto">
              {mainList.map((i) => (
                <SideBarListBtn
                  listData={i}
                  listIndex={listIndex}
                  mainList={mainList}
                  setMainList={setMainList}
                  setlistIndex={setlistIndex}
                  key={`sideBarBtn${i.title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
