import { CloseBtn } from "@/components/projects/components/global/buttons";
import { TDList, ToDoListData } from "@/functions/interfaces";
import { Dispatch, SetStateAction } from "react";

export default function SideBarListBtn({
  listIndex,
  mainList,
  setMainList,
  setlistIndex,
  listData,
}: {
  mainList: TDList[];
  listIndex: number;
  setlistIndex: Dispatch<SetStateAction<number>>;
  setMainList: Dispatch<SetStateAction<TDList[]>>;
  listData: TDList;
}) {
  function deleteList() {
    const newList = mainList.filter(
      (oldLists) => oldLists.title !== listData.title
    );
    setlistIndex(0);
    setMainList(newList);

    const toDoLocalData = localStorage.getItem("to_do_list_data");
    const holder_list: ToDoListData =
      toDoLocalData && JSON.parse(toDoLocalData);

    holder_list.lists = newList;
    localStorage.setItem("to_do_list_data", JSON.stringify(holder_list));
  }
  return (
    <div
      onClick={() =>
        setlistIndex(() =>
          mainList.findIndex((list) => list.title === listData.title)
        )
      }
      className={`${
        mainList[listIndex]?.title === listData.title ? "bg-neutral-200" : ""
      } w-full py-2 relative border-b-2 border-zinc-500 bgHover cursor-pointer close-on-click text-ellipsis whitespace-nowrap pl-8`}
      title={listData.title}
    >
      {listData.title}
      <div className="absolute h-full top-0 right-0 grid place-items-center">
        <CloseBtn fontSize="20px" func={deleteList} rounded />
      </div>
    </div>
  );
}
