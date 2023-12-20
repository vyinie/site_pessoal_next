import { CommonBtn } from "@/components/projectsComponents/components/global/buttons";
import {
  CommonInp,
  DateInp,
} from "@/components/projectsComponents/components/global/inputs";
import { accessibility } from "@/functions/accessibilityFunctions";
import { dataHandlers } from "@/functions/dataHandlers";
import { SetBoo, debt } from "@/functions/interfaces";
import { verifiers } from "@/functions/verifyers";
import { useState } from "react";

const Verifiers = new verifiers();
const DataHandlers = new dataHandlers();
const Access = new accessibility();

export function EditDebtPopUp({
  debtData,
  open,
  setOpen,
}: {
  debtData: debt;
  open: boolean;
  setOpen: SetBoo;
}) {
  // ================ data to add a new note ================
  const [editedItem, setEditedItem] = useState<debt>(debtData);

  // ================ edit the note ================
  function editDebt() {
    if (
      Verifiers.ObjChecker(editedItem) &&
      editedItem.installments >= editedItem.remainingInsts
    ) {
    } else {
    }
  }

  function getData(e) {
    DataHandlers.getData(e, setEditedItem);
    if (editedItem.installments < editedItem.remainingInsts) {
      setEditedItem((old) => ({
        ...old,
        remainingInsts: editedItem.installments,
      }));
    }
  }
  return (
    <div
      onClick={(e) => Access.closeWrapper(e, setOpen)}
      className={`${
        open ? "z-10" : "-z-10"
      } common_wrapper close-on-click`}
    >
      <div
        onChange={getData}
        className="mobile:flex flex-col grid grid-cols-2 grid-rows-3 items-center gap-2 bg-white dark:bg-zinc-700 p-4 w-fit rounded-md"
      >
        {/* =============== nome =============== */}
        <div>
          <p className="text-start">nome</p>
          <CommonInp
            name="name"
            w="w-52"
            type="text"
            placeholder="Nome"
            inpValue={editedItem.name}
          />
        </div>
        <div>
          <p className="text-start">valor total</p>
          <CommonInp
            name="value"
            w="w-52"
            type="number"
            placeholder="Valor"
            inpValue={DataHandlers.localeDecimal(editedItem.value)}
          />
        </div>
        <div>
          <p className="text-start">parcelas totais</p>
          <CommonInp
            name="installments"
            w="w-52"
            type="number"
            placeholder="Parcelas"
            inpValue={editedItem.installments}
          />
        </div>
        <div>
          <p className="text-start">parcelas restantes</p>
          <CommonInp
            name="remainingInsts"
            w="w-52"
            type="number"
            placeholder="Parcelas Restantes"
            inpValue={editedItem.remainingInsts}
          />
        </div>

        <div>
          <p className="text-start">data de entrada</p>
          <DateInp date={editedItem.date.split("T")[0]} />
        </div>

        <CommonBtn
          className="exept-mobile:self-end"
          text="editar"
          ActFunc={editDebt}
        />
      </div>
    </div>
  );
}
