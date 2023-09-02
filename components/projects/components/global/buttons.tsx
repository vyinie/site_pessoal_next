"use client";

import "./styles.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FilterListIcon from "@mui/icons-material/FilterList";
import EditIcon from "@mui/icons-material/Edit";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AlignVerticalBottomIcon from "@mui/icons-material/AlignVerticalBottom";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddIcon from "@mui/icons-material/Add";
import MultipleStopIcon from "@mui/icons-material/MultipleStop";

import { accessibility } from "@/functions/accessibilityFunctions";
import { CommonBtn, SetBoo } from "@/functions/interfaces";
import { Dispatch, SetStateAction } from "react";

const Access = new accessibility();
// ========================= GREEN BUTTON =========================
export function CommonBtn({ ActFunc, text, className }: CommonBtn) {
  return (
    <button
      onClick={ActFunc}
      className={`${
        className || "bg-green-500 hover:bg-green-600 py-2 px-3"
      } capitalize cursor-pointer transition rounded-md text-white`}
    >
      {text}
    </button>
  );
}

// ========================= FILTER ICON =========================
export function FilterBtn() {
  return (
    <div>
      <FilterListIcon />
    </div>
  );
}

// ========================= DELETE BTN =========================
export function DelBtn({
  className,
  func,
  rounded,
  fontSize,
}: {
  rounded?: "full" | "md";
  fontSize?: string;
  className?: string;
  func: () => void;
}) {
  return (
    <div
      className={`${className} ${
        rounded === "full" ? "btn_hover_full" : "btn_hover_md"
      } min-h-[40px] min-w-[40px] flex justify-center items-center`}
    >
      <div
        tabIndex={0}
        onKeyDown={(e) => Access.enterAct(e, func)}
        onClick={func}
        className="kase"
      ></div>
      <DeleteOutlineIcon sx={{ fontSize: fontSize || "35px" }} />
    </div>
  );
}

export function AddBtn({
  className,
  func,
  rounded,
  fontSize,
}: {
  rounded?: "full" | "md";
  fontSize?: string;
  className?: string;
  func: () => void;
}) {
  return (
    <div
      className={`${className} ${
        rounded === "full" ? "btn_hover_full" : "btn_hover_md"
      } min-h-[40px] min-w-[40px] flex justify-center items-center`}
    >
      <div
        tabIndex={0}
        onKeyDown={(e) => Access.enterAct(e, func)}
        onClick={func}
        className="kase"
      ></div>
      <AddIcon sx={{ fontSize: fontSize || "35px" }} />
    </div>
  );
}

// ========================= TOGGLE EDIT WRAPPER =========================
/** tem a função expecifica de abrir popups pra edição
 ** hidden === true => overflow do body muda*/
export function EditBtn({
  setToggle,
  hidden,
  rounded,
  fontSize,
}: {
  rounded?: "full" | "md";
  fontSize?: string;

  setToggle: SetBoo;
  hidden?: boolean;
}) {
  function handlerEditDispay(e) {
    if (hidden) {
      Access.handlerWrapper(e, setToggle);
    } else {
      setToggle((old) => !old);
    }
  }

  function enterAct(e) {
    Access.enterAct(handlerEditDispay, e);
  }
  return (
    <div
      className={`${
        rounded === "full" ? "btn_hover_full" : "btn_hover_md"
      } min-h-[40px] min-w-[40px] flex justify-center items-center`}
    >
      <div
        tabIndex={0}
        onClick={handlerEditDispay}
        onKeyDown={enterAct}
        className="btn kase change-on-click"
      ></div>
      <EditIcon sx={{ fontSize: fontSize || "32px" }} />
    </div>
  );
}

// ========================= I EM ITALICO =========================
export function InfoBtn({ setToggle }) {
  const handlerEditDispay = (e) => {
    Access.handlerWrapper(e, setToggle);
  };
  return (
    <div className="btn_hover_full min-h-[40px] min-w-[40px] flex justify-center items-center">
      <div
        onClick={handlerEditDispay}
        tabIndex={0}
        className="kase change-on-click"
      ></div>
      <InfoOutlinedIcon sx={{ fontSize: "30px" }} />
    </div>
  );
}

// ========================= THREE DOTS =========================
export function MoreOptsBtn({
  children,
  standing,
  className,
  type,
  func,
}: {
  children?: React.ReactNode;
  standing?: boolean;
  type: "lines" | "dots";
  className?: string;
  func: (e?) => void;
}) {
  // três pontinhos, é uma tag pai
  return (
    <div className={`${className || ""} relative flex gap-1 items-center`}>
      <div
        tabIndex={0}
        className={`${standing ? "flex-col" : ""} ${
          type === "dots"
            ? "w-10 gap-1 btn_hover_full"
            : "w-12 btn_hover_md p-1 flex-col gap-1.5"
        } flex justify-center items-center h-10`}
      >
        <div className="kase change-on-click" onClick={func}></div>
        <div
          className={`h-1.5 ${
            type === "dots" ? "w-1.5" : "w-full"
          } bg-black dark:bg-white rounded-full`}
        ></div>
        <div
          className={`h-1.5 ${
            type === "dots" ? "w-1.5" : "w-full"
          } bg-black dark:bg-white rounded-full`}
        ></div>
        <div
          className={`h-1.5 ${
            type === "dots" ? "w-1.5" : "w-full"
          } bg-black dark:bg-white rounded-full`}
        ></div>
      </div>
      {children}
    </div>
  );
}

/** btn para selecionar direção de listas
 ** isVert = state
 ** setVert = setState
 ** func = função adicional opicional
 */
export function DirectionBtn({
  isVert,
  setVert,
  func,
  rounded,
  className,
  fontSize,
}: {
  rounded?: "full" | "md";
  fontSize?: string;
  isVert: boolean;
  setVert: SetBoo;
  func?: (e?) => void;
  className?: string;
}) {
  function handlerIcon(e) {
    setVert((old) => !old);
    func && func(e);
  }
  return (
    <div
      className={`${className}
      ${rounded === "full" ? "btn_hover_full" : "btn_hover_md"}
      ${isVert ? "rotate-180" : "rotate-90"}
       min-h-[40px] min-w-[40px] flex justify-center items-center`}
    >
      <div className="kase" onClick={handlerIcon}></div>
      <AlignVerticalBottomIcon />
    </div>
  );
}

/** botão para marcar todas as checkboses */
export function MarkAllBoxesBtn({
  func,
  rounded,
  fontSize,
}: {
  rounded?: "full" | "md";
  fontSize?: string;
  func: (e?) => void;
}) {
  function handlerIcon(e) {
    func(e);
  }
  return (
    <div
      className={`${
        rounded === "full" ? "btn_hover_full" : "btn_hover_md"
      } min-h-[40px] min-w-[40px] flex justify-center items-center`}
    >
      <div className="kase" tabIndex={0} onClick={handlerIcon}></div>
      <LibraryAddCheckIcon sx={{ fontSize: fontSize || "30px" }} />
    </div>
  );
}

export function UnmarkAllBoxesBtn({
  func,
  rounded,
  fontSize,
}: {
  rounded?: "full" | "md";
  fontSize?: string;
  func: (e?) => void;
}) {
  function handlerIcon(e) {
    func(e);
  }
  return (
    <div
      className={`${
        rounded === "full" ? "btn_hover_full" : "btn_hover_md"
      } min-h-[40px] min-w-[40px] flex justify-center items-center`}
    >
      <div className="kase" tabIndex={0} onClick={handlerIcon}></div>
      <IndeterminateCheckBoxIcon sx={{ fontSize: fontSize || "30px" }} />
    </div>
  );
}

export function SwitchArrowsBtn({
  func,
  rounded,
  fontSize,
}: {
  rounded?: "full" | "md";
  fontSize?: string;
  func: (e?) => void;
}) {
  function handlerIcon(e) {
    func(e);
  }
  return (
    <div
      className={`${
        rounded === "full" ? "btn_hover_full" : "btn_hover_md"
      } min-h-[40px] min-w-[40px] flex justify-center items-center`}
    >
      <div className="kase" tabIndex={0} onClick={handlerIcon}></div>
      <MultipleStopIcon sx={{ fontSize: fontSize || "30px" }} />
    </div>
  );
}

/** pop over generico com btns de edição e delete 
 
 ** optsToggle = state que define se o pop over está aberto
 ** setOptsToggle = setState do optsToggle

 ** delFunc = função do btn de delete
 ** setEditToggle= abrir o pop ip de edição do item
 ** layed = direção do pop over

*/
export function DelEditPopOver({
  setEditToggle,
  delFunc,

  optsToggle,
  setOptsToggle,
  
  layed,
}: {
  setEditToggle: Dispatch<SetStateAction<boolean>>;
  delFunc: () => void;

  optsToggle: boolean;
  setOptsToggle: Dispatch<SetStateAction<boolean>>;

  layed?: boolean;
}) {
  return (
    <>
      {/* fecha o pop-over qndo clicar fora */}
      <div
        onClick={(e) => Access.closeWrapper(e, setOptsToggle)}
        className={`${
          optsToggle ? "fixed" : "hidden"
        } h-screen w-screen top-0 left-0 z-[2] close-on-click`}
      ></div>
      <div
        className={`${
          optsToggle
            ? layed
              ? "w-24 h-12 border-2 grid-flow-col"
              : "w-12 h-24 border-2"
            : "w-0 h-0"
        } overflow-hidden bg-slate-200 border-zinc-500 rounded-md absolute top-5 right-9 transition-all grid place-items-center close-on-click z-10`}
      >
        <EditBtn rounded="full" setToggle={setEditToggle} />
        <DelBtn rounded="full" func={delFunc} />
      </div>
    </>
  );
}
