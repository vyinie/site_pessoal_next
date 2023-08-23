import { ToDoItem } from "@/functions/interfaces";
import { CommonInp } from "../../components/global/inputs";
import { CommonBtn } from "../../components/global/buttons";
import { accessibility } from "@/functions/accessibilityFunctions";
import { DataHandlers } from "@/functions/dataHandlers";

export default function ToDoForm({
  list,
  setList,
  addNewItem,
}: {
  list: ToDoItem;
  setList: any;
  addNewItem: () => void;
}) {
  const Access = new accessibility();
  const dataH = new DataHandlers();
  return (
    <div
      onChange={(e) => dataH.getData(e, setList)}
      onKeyDown={(e) => Access.enterAct(addNewItem, e)}
      className="p-2 w-fit flex gap-2 items-center justify-center border-neutral-300 border-2 rounded-md"
    >
      <CommonInp
        name="text"
        inpValue={list.text}
        placeholder="À Fazer"
        type="text"
        h="h-10"
        w="w-56"
      />
      <CommonBtn ActFunc={addNewItem} text="Add" />
    </div>
  );
}
