import { ToDoItem } from "@/functions/interfaces";
import { accessibility } from "@/functions/accessibilityFunctions";
import { dataHandlers } from "@/functions/dataHandlers";
import { CommonInp } from "@/components/projectsComponents/components/global/inputs";
import { CommonBtn } from "@/components/projectsComponents/components/global/buttons";
import { Dispatch, SetStateAction } from "react";

export default function ToDoForm({
  newToDo,
  setNewToDo,
  addNewItem,
}: {
  newToDo: ToDoItem;
  setNewToDo: Dispatch<SetStateAction<ToDoItem>>;
  addNewItem: () => void;
}) {
  const Access = new accessibility();
  const dataH = new dataHandlers();
  return (
    <div
      onChange={(e) => dataH.getData(e, setNewToDo)}
      onKeyDown={(e) => Access.enterAct(e,addNewItem)}
      className="p-2 w-fit flex gap-2 items-center justify-center border-neutral-300 border-2 rounded-md"
    >
      <CommonInp
        name="text"
        inpValue={newToDo.text}
        placeholder="À Fazer"
        type="text"
        h="h-10"
        w="w-56"
      />
      <CommonBtn ActFunc={addNewItem} text="Add" />
    </div>
  );
}
