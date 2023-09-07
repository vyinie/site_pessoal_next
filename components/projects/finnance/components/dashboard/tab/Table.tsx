import { FinnanceData, } from "@/functions/interfaces";
import TableRow from "./TableRow";
import { Dispatch, SetStateAction } from "react";

export default function Table({ finnanceData,setFinnanceData }: { finnanceData: FinnanceData,setFinnanceData: Dispatch<SetStateAction<FinnanceData>>
}) {
  return (
    <div className="w-[95%] max-h-screen mt-8 pb-10 overflow-auto mobile-lg:w-full">
      <table className="w-full  min-w-[600px] capitalize">
        <thead>
          <tr className=" border-solid border-b-[1.5px] text-xl border-slate-300">
            <th>nome</th>
            <th>valor</th>
            <th>fluxo</th>
            <th>classe</th>
            <th>data</th>
            <th>ações</th>
          </tr>
        </thead>
        <tbody className=" w-full dark:text-white dark:text-opacity-60 text-center">
          {finnanceData.notesList.notes.map((i) => (
            <TableRow key={`finnance_table_row${i.id}`} item={i} setFinnanceData={setFinnanceData} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
