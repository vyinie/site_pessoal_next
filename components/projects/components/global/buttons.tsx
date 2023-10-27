"use client";

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
import { Close, Menu, MoreVert } from "@mui/icons-material";

const Access = new accessibility();
// ========================= GREEN BUTTON =========================
export function CommonBtn({ ActFunc, text, className, color }: CommonBtn) {
  return (
    <button
      onClick={ActFunc}
      className={`
      ${className || ""}
      ${color || "bg-green-500 hover:bg-green-600 "}
       capitalize cursor-pointer transition rounded-md text-white py-2 px-3`}
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
      } w-8 h-8 flex justify-center items-center`}
    >
      <div
        tabIndex={0}
        onKeyDown={(e) => Access.enterAct(e, func)}
        onClick={func}
        className="kase change-on-click"
      ></div>
      <DeleteOutlineIcon sx={{ fontSize: fontSize || "30px" }} />
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
      } w-8 h-8 flex justify-center items-center`}
    >
      <div
        tabIndex={0}
        onKeyDown={(e) => Access.enterAct(e, func)}
        onClick={func}
        className="kase"
      ></div>
      <AddIcon sx={{ fontSize: fontSize || "30px" }} />
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
      Access.handlerWrapper(e, setToggle, true);
    } else {
      Access.handlerWrapper(e, setToggle);
    }
  }

  function enterAct(e) {
    Access.enterAct(handlerEditDispay, e);
  }
  return (
    <div
      className={`${
        rounded === "full" ? "btn_hover_full" : "btn_hover_md"
      } w-8 h-8 flex justify-center items-center`}
    >
      <div
        tabIndex={0}
        onClick={handlerEditDispay}
        onKeyDown={enterAct}
        className="kase change-on-click"
      ></div>
      <EditIcon sx={{ fontSize: fontSize || "30px" }} />
    </div>
  );
}

// ========================= I EM ITALICO =========================
export function InfoBtn({ setToggle }) {
  const handlerEditDispay = (e) => {
    Access.handlerWrapper(e, setToggle);
  };
  return (
    <div className="btn_hover_full w-8 h-8 flex justify-center items-center">
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
/** 3 pontinhos ou sandwitch 
 ** ser quiser que ele tenha position fixed ponha dentro de um div,
    ele é relative
*/
export function HamburgerBtn({
  children,
  className,
  func,
}: {
  children?: React.ReactNode;
  className?: string;
  func: (e?) => void;
}) {
  return (
    <div onClick={func} className={`${className || ""} relative`}>
      <div tabIndex={0} className={`w-9 h-8 grid place-items-center`}>
        <div className="kase change-on-click" />
        <Menu sx={{fontSize:"35px"}} className="dark:text-white" />
      </div>

      {children}
    </div>
  );
}

export function ThreeDotsBtn({
  children,
  className,
  func,
  standing,
  isOn,
}: {
  children?: React.ReactNode;
  className?: string;
  standing?: boolean;
  func: (e?) => void;
  isOn: boolean;
}) {
  // três pontinhos, é uma tag pai
  return (
    <div onClick={func} className={`${className || ""} relative`}>
      <div
        tabIndex={0}
        className={`${
          standing ? "" : "rotate-90"
        } w-8 h-8 gap-1 btn_hover_full flex justify-center items-center`}
      >
        <div className="kase change-on-click" />
        {isOn ? (
          <Close sx={{ fontSize: "30px" }} />
        ) : (
          <MoreVert sx={{ fontSize: "35px" }} />
        )}
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
}: {
  rounded?: "full" | "md";

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
       w-8 h-8 flex justify-center items-center`}
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
      } w-8 h-8 flex justify-center items-center`}
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
      } w-8 h-8 flex justify-center items-center`}
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
      } w-8 h-8 flex justify-center items-center`}
    >
      <div
        className="kase change-on-click"
        tabIndex={0}
        onClick={handlerIcon}
      ></div>
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
  center,
}: {
  setEditToggle: SetBoo;
  delFunc: () => void;

  optsToggle: boolean;
  setOptsToggle: SetBoo;

  layed?: boolean;
  center?: boolean;
}) {
  return (
    <>
      {/* fecha o pop-over qndo clicar fora */}

      <div
        onClick={() => setOptsToggle((old) => !old)}
        className={`${
          optsToggle
            ? layed
              ? "w-20 h-10 border-2 grid-flow-col"
              : "w-10 h-20 border-2"
            : "w-0 h-0"
        }
        ${center ? "top-1/2 -translate-y-1/2" : "top-5"}
        overflow-hidden bg-slate-200 border-zinc-500 rounded-md absolute right-7 transition-all grid place-items-center z-10`}
      >
        <EditBtn rounded="full" setToggle={setEditToggle} />
        <DelBtn rounded="full" func={delFunc} />
      </div>
    </>
  );
}
