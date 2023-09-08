import {
  DelBtn,
  EditBtn,
} from "@/components/projects/components/global/buttons";
import { dataHandlers } from "@/functions/dataHandlers";
import { FinnanceData, note } from "@/functions/interfaces";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { EditNotePopUp } from "../editPopUp/editPopUps";

const DataHandlers = new dataHandlers();

export default function TableRow({
  item,
  setFinnanceData,
}: {
  item: note;
  setFinnanceData: Dispatch<SetStateAction<FinnanceData>>;
}) {
  const [editPopUpToggle, setEditPopUpToggle] = useState(false);

  function delItem() {
    const holder = localStorage.getItem("finnance_data");
    const data: FinnanceData = JSON.parse(holder || "{}");

    const newNoteList = data.notesList.notes.filter((i) => i.id != item.id);
    data.notesList.notes = newNoteList;

    localStorage.setItem("finnance_data", JSON.stringify(data));
    setFinnanceData(() => data);
  }

  useEffect(() => {
    if (editPopUpToggle) {
      if (item.flow === "entrada") {
        document.getElementById(`editInFlow${item.id}`)?.click();
      } else {
        document.getElementById(`editOutFlow${item.id}`)?.click();
      }
    }
  }, [editPopUpToggle]);

  return (
    <tr
      className="bgHover py-2 border-solid border-b-[1.5px] border-slate-300 transition text-lg"
    >
      {/* nome */}
      <td className="max-w-[150px] w-fit text-center overflow-hidden text-ellipsis">
        {item.name}
      </td>

      {/* valor */}
      <td
        className={`${
          item.flow === "saida" ? "text-red-500" : "text-green-500"
        } max-w-[120px] px-3 text-ellipsis overflow-hidden`}
      >
        R$
        {DataHandlers.localeDecimal(item.value.toString().replace(".", ","))}
      </td>

      {/* fluxo */}
      <td className={item.flow === "saida" ? "text-red-500" : "text-green-500"}>
        {item.flow}
      </td>

      {/* classe */}
      <td className="max-w-[120px] px-3 text-ellipsis overflow-hidden">
        {item.noteClass}
      </td>

      {/* data */}
      <td>{DataHandlers.localeDate(item.date)}</td>

      {/* cçoes */}
      <td className="flex gap-2 items-center justify-center">
        <DelBtn func={delItem} rounded="full" />
        <EditBtn setToggle={setEditPopUpToggle} rounded="full" />
        <EditNotePopUp
          setFinnanceData={setFinnanceData}
          noteData={item}
          open={editPopUpToggle}
          setOpen={setEditPopUpToggle}
        />
      </td>
    </tr> 
  );
}
