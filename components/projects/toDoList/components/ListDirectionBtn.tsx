"use client";
import AlignVerticalBottomIcon from "@mui/icons-material/AlignVerticalBottom";
import AlignHorizontalRightIcon from "@mui/icons-material/AlignHorizontalRight";
import { SetBoo, ToDoListData } from "@/functions/interfaces";
import { DelBtn, MoreOptsBtn } from "../../components/global/buttons";
import { accessibility } from "@/functions/accessibilityFunctions";

const Access = new accessibility();

export function ListDirectionBtn({
  vert,
  setVert,
}: {
  vert: boolean;
  setVert: SetBoo;
}) {
  function handlerIcon() {
    setVert((old) => !old);

    const t: ToDoListData = JSON.parse(
      localStorage.getItem("to_do_list_data") || "{}"
    );
    const holder_list = {
      ...t,
      verticalList: !t.verticalList,
    };

    localStorage.setItem("to_do_list_data", JSON.stringify(holder_list));
  }
  return (
    <div className="p-2 rounded-md actBtn ">
      <div className="kase" onClick={handlerIcon}></div>
      {vert ? <AlignHorizontalRightIcon /> : <AlignVerticalBottomIcon />}
    </div>
  );
}

export default function ToDoListMoreOpt({
  vert,
  setVert,
  delAllItems,
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: SetBoo;
  vert: boolean;
  setVert: SetBoo;
  delAllItems: () => void;
}) {
  return (
    <MoreOptsBtn
      func={(e) => Access.handlerWrapper(e, setIsOpen)}
      className="h-fit "
      standing
    >
      <div
        onMouseLeave={() => setIsOpen(() => false)}
        className={`${
          isOpen ? "grid" : "hidden"
        } gap-1 justify-center bg-white z-10 rounded-md absolute top-full left-0 border border-zinc-400 `}
      >
        <ListDirectionBtn setVert={setVert} vert={vert} />
        <DelBtn className="rounded-md" func={delAllItems} />
      </div>
    </MoreOptsBtn>
  );
}
