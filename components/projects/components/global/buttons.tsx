"use client";

import "./styles.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FilterListIcon from "@mui/icons-material/FilterList";
import EditIcon from "@mui/icons-material/Edit";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { accessibility } from "@/functions/accessibilityFunctions";
import { CommonBtn, SetBoo } from "@/functions/interfaces";

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
}: {
  className?: string;
  func: () => void;
}) {
  return (
    <div
      className={`${
        className || "rounded-full"
      } actBtn p-1 flex justify-center items-center relative `}
    >
      <div
        tabIndex={0}
        onKeyDown={(e) => Access.enterAct(func, e)}
        onClick={func}
        className="kase"
      ></div>
      <DeleteOutlineIcon sx={{ fontSize: "30px" }} />
    </div>
  );
}

// ========================= TOGGLE EDIT WRAPPER =========================
/** tem a função expecifica de abrir popups pra edição
 ** hidden === true => overflow do body muda*/
export function EditBtn({
  setToggle,
  hidden,
}: {
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
    <div className="stay-on-click actBtn p-1 relative">
      <div
        tabIndex={0}
        onClick={handlerEditDispay}
        onKeyDown={enterAct}
        className="btn kase change-on-click"
      ></div>
      <EditIcon sx={{ fontSize: "30px" }} />
    </div>
  );
}

// ========================= THREE DOTS =========================
export function InfoBtn({ setToggle }) {
  const handlerEditDispay = (e) => {
    Access.handlerWrapper(e, setToggle);
  };
  return (
    <div className="stay-on-click actBtn p-1 relative">
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
  func,
}: {
  children?: React.ReactNode;
  standing?: boolean;
  className?: string;
  func: (e?) => void;
}) {
  // três pontinhos, é uma tag pai
  return (
    <div className={`${className} relative  flex gap-1 items-center`}>
      <div
        tabIndex={0}
        className={`${
          standing ? "flex-col" : ""
        }  flex gap-1 justify-center actBtn items-center w-9 h-9`}
      >
        <div className="kase change-on-click" onClick={func}></div>
        <div className="h-1.5 w-1.5 bg-black dark:bg-white rounded-full"></div>
        <div className="h-1.5 w-1.5 bg-black dark:bg-white rounded-full"></div>
        <div className="h-1.5 w-1.5 bg-black dark:bg-white rounded-full"></div>
      </div>
      {children}
    </div>
  );
}
