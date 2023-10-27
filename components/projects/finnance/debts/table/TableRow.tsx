import { FinnanceData, debt } from "@/functions/interfaces";
import {
  DelBtn,
  EditBtn,
  InfoBtn,
  ThreeDotsBtn,
} from "@/components/projects/components/global/buttons";

import { accessibility } from "@/functions/accessibilityFunctions";
import { dataHandlers } from "@/functions/dataHandlers";
import { Dispatch, SetStateAction, useState } from "react";
import { EditDebtPopUp } from "../EditPopUp";
import { DebtInfoCard } from "../infoCards";

const Access = new accessibility();
const DataHandlers = new dataHandlers();

export default function DebtTableRow({
  debtItem,
  setFinnanceData,
}: {
  debtItem: debt;
  setFinnanceData: Dispatch<SetStateAction<FinnanceData>>;
}) {
  const [moreOptsToggle, setMoreOptsToggle] = useState(false);
  const [editPopUpToggle, setEditPopUpToggle] = useState(false);
  const [infoCardPopUpToggle, setInfoCardPopUpToggle] = useState(false);

  const inst = (value: number, installments: number) => {
    const div = Math.ceil(value / installments);
    const res = DataHandlers.localeDecimal(div.toString().replace(".", ","));
    return res;
  };

  function delItem() {
    const holder = localStorage.getItem("finnance_data");
    const data: FinnanceData = JSON.parse(holder || "{}");

    const newDebtsList = data.debtsList.filter((i) => i.id !== debtItem.id);
    data.debtsList = newDebtsList;

    localStorage.setItem("finnance_data", JSON.stringify(data));
    setFinnanceData(() => data);
  }

  function payDebt() {
    const holder = localStorage.getItem("finnance_data") || "{}";
    const data: FinnanceData = JSON.parse(holder);

    const index = data.debtsList.findIndex((i) => i.id === debtItem.id);

    data.debtsList[index].remainingInsts--;

    setFinnanceData(() => data);
    localStorage.setItem("finnance_data", JSON.stringify(data));
  }
  return (
    <tr
      className={`${
        debtItem.remainingInsts === 0 && "text-green-600"
      } border-solid border-b-[1.5px] border-slate-300 bgHover  text-lg`}
    >
      {/* nome */}
      <td className="max-w-[200px] overflow-hidden text-ellipsis">
        {debtItem.name}
      </td>

      {/* mensalidade */}
      <td>R$ {inst(debtItem.value, debtItem.installments)}</td>

      {/* parcelas restantes */}
      <td>{debtItem.remainingInsts}</td>

      {/* data de entrada */}
      <td>{DataHandlers.localeDate(debtItem.date)}</td>

      {/* açoes */}
      <td className="flex items-center justify-center gap-1">
        <button
          onClick={payDebt}
          className="font-bold uppercase text-xl btn_hover_full px-2 py-1"
        >
          pagar
        </button>
        <ThreeDotsBtn
          func={() => setMoreOptsToggle((old) => !old)}
          isOn={moreOptsToggle}
          key={`actbtn${debtItem.id}`}
        >
          <div
            // onClick={(e) => Access.handlerWrapper(e, setMoreOptsToggle)}
            className={`${
              moreOptsToggle ? "" : "hidden"
            } fixed h-screen w-screen change-on-click z-[2] top-0 left-0`}
          ></div>
          <div
            className={`${
              moreOptsToggle ? "w-36 border-2 border-neutral-400" : "w-0 "
            } overflow-hidden absolute top-1/2 right-full -translate-y-1/2 flex justify-between bg-slate-100 rounded transition-all z-10`}
          >
            <DelBtn rounded="full" func={delItem} />
            <EditBtn rounded="full" setToggle={setEditPopUpToggle} />
            <InfoBtn setToggle={setInfoCardPopUpToggle} />
          </div>
        </ThreeDotsBtn>
      </td>
      <EditDebtPopUp
        debtData={debtItem}
        open={editPopUpToggle}
        setOpen={setEditPopUpToggle}
      />
      <DebtInfoCard
        info={debtItem}
        open={infoCardPopUpToggle}
        setOpen={setInfoCardPopUpToggle}
      />
    </tr>
  );
}
