import { MoreOptsBtn } from "@/components/projects/components/global/buttons";
import { ColorDIficultControl } from "@/functions/interfaces";
import { accessibility } from "@/functions/accessibilityFunctions";
import { Dispatch, SetStateAction } from "react";

export function DificultControl({
  dificultModes,
  setDificult,
}: {
  setDificult: (itemData: ColorDIficultControl) => void;
  dificultModes: ColorDIficultControl[];
}) {
  return (
    <>
      {dificultModes.map((i) => (
        <div
          key={`diff_${i.text}`}
          onClick={() => setDificult(i)}
          className={`${
            i.setted ? "bg-slate-300" : ""
          } w-10/12 py-1 border-2 border-zinc-600 text-center text-xl btn_hover_md uppercase change-on-click`}
        >
          {i.text}
        </div>
      ))}
    </>
  );
}

const Access = new accessibility();

export function DificultControlMobile({
  setDiffControlToggle,
  DiffControlToggle,
  setDificult,
  dificultModes,
}: {
  setDificult: (itemData: ColorDIficultControl) => void;
  dificultModes: ColorDIficultControl[];

  DiffControlToggle: boolean;
  setDiffControlToggle: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <div
        onClick={(e) => Access.closeWrapper(e, setDiffControlToggle)}
        className={`${
          DiffControlToggle ? "fixed" : "hidden"
        } close-on-click w-screen h-screen  top-0 left-0 z-10`}
      ></div>
      
      <div className="hidden moblet:grid absolute top-1/2 -translate-y-1/2 -right-12 z-10">
        <MoreOptsBtn
          func={(e) => Access.handlerWrapper(e, setDiffControlToggle)}
          type="dots"
          standing
        >
          <div
          onClick={(e) => Access.handlerWrapper(e, setDiffControlToggle)}
            className={`${
              DiffControlToggle ? "w-36 h-44 border-2" : " w-0 h-0"
            } grid place-items-center bg-slate-100 rounded-md  border-zinc-600 transition-all overflow-hidden absolute right-3/4 top-3/4 `}
          >
            <DificultControl
              setDificult={setDificult}
              dificultModes={dificultModes}
            />
          </div>
        </MoreOptsBtn>
      </div>
    </>
  );
}
