"use client";
import { FinnanceData } from "@/functions/interfaces";
import DebtTableRow from "./TableRow";
import { Dispatch, SetStateAction } from "react";

export default function DebtTab({
  finnanceData,
  setFinnanceData,
}: {
  finnanceData: FinnanceData;
  setFinnanceData: Dispatch<SetStateAction<FinnanceData>>;

}) {
  
  return (
    <div className="tab w-[95%] mt-4 pb-1">
      <table className="w-full">
        <tbody className="w-full capitalize dark:text-white dark:text-opacity-60 text-center">
          <tr className="border-solid border-b-[1.5px] text-xl border-slate-300">
            <th className="px-2">nome</th>
            <th className="px-2">mensalidade</th>
            <th className="px-2">par. restantes</th>
            <th className="px-2">inicio</th>
            <th className="px-2">ações</th>
          </tr>
          {finnanceData.debtsList.map((i) => (
            <DebtTableRow setFinnanceData={setFinnanceData} debtItem={i} key={`debt${i.id}`} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
