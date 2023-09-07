"use client";
import { CommonBtn } from "@/components/projects/components/global/buttons";
import {
  CommonInp,
  DateInp,
} from "@/components/projects/components/global/inputs";
import { accessibility } from "@/functions/accessibilityFunctions";
import { dataHandlers } from "@/functions/dataHandlers";
import { FinnanceData, debt } from "@/functions/interfaces";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const DataHandler = new dataHandlers();
const Access = new accessibility();

export function DebtForm({
  finnanceData,
  setFinnanceData,
}: {
  finnanceData: FinnanceData;
  setFinnanceData: Dispatch<SetStateAction<FinnanceData>>;
}) {
  const date = new Date().toISOString().split("T")[0];

  //  =============== informaçoes da divida ===============
  const [debt, setDebt] = useState<debt>({
    name: "",
    id: finnanceData.globalIds,
    value: 0,
    installments: 0,
    remainingInsts: 0,
    date: date,
  });

  /** caso os dados estejam corretos, add uma anotação */
  function successTry() {
    const holder = localStorage.getItem("finnance_data") || "{}";
    const data: FinnanceData = JSON.parse(holder);

    const formated = DataHandler.formatForms(debt);
    data.debtsList.push(formated);
    data.globalIds++;

    localStorage.setItem("finnance_data", JSON.stringify(data));

    // mostrando os dados
    setFinnanceData(() => data);
    setDebt((old) => ({
      ...old,
      id: data.globalIds,
      value: 0,
      name: "",
      date: date,
      installments: 0,
    }));
  }

  /** add divida ao localStorage */
  function addDebt() {
    const inputNames = ["name", "value", "installments"];
    const invalid = inputNames.every((i) => debt[i]);
    // pega todos os inputs com o 'name' igual ao param
    const input = (name) => document.getElementsByName(name)[0];

    if (invalid) {
      successTry();
      input("name").focus();
    } else {
      // filtra todos os 'name' dos inputs invalidos
      const emptyInps = inputNames.filter(
        (i) => debt[i] === "" || debt[i] === 0
      );

      // redireciona o foco do user aos inputs invalidos
      input(emptyInps[0]).focus();
    }
  }

  useEffect(() => {
    setDebt((old) => ({ ...old, remainingInsts: old.installments }));
  }, [debt.installments]);

  return (
    <div
      onChange={(e) => DataHandler.getData(e, setDebt)}
      onKeyDown={(e) => Access.enterAct(e, addDebt)}
      className="flex items-center gap-2 flex-wrap w-fit py-2  justify-center text-left border-y-2 border-slate-300 dark:border-zinc-600"
    >
      <CommonInp
        name="name"
        w="w-48"
        type="text"
        placeholder="Nome"
        inpValue={debt.name}
      />
      <CommonInp
        name="value"
        w="w-32"
        type="number"
        placeholder="Valor"
        inpValue={debt.value == 0 ? "" : debt.value}
      />
      <CommonInp
        name="installments"
        w="w-24"
        type="number"
        placeholder="Parcelas"
        inpValue={debt.installments == 0 ? "" : debt.installments}
      />
      <DateInp date={debt.date} />

      <CommonBtn text="Adicionar" ActFunc={addDebt} />
    </div>
  );
}
