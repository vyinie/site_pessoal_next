"use client";
import AlignVerticalBottomIcon from "@mui/icons-material/AlignVerticalBottom";
import AlignHorizontalRightIcon from "@mui/icons-material/AlignHorizontalRight";
import { SetBoo, ToDoListData } from "@/functions/interfaces";


export default function ListDirectionBtn({
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
    <div className="p-2 btn_hover_md ">
      <div className="kase" onClick={handlerIcon}></div>
      {vert ? <AlignHorizontalRightIcon /> : <AlignVerticalBottomIcon />}
    </div>
  );
}


