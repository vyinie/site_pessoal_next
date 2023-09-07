"use client";

import { dataHandlers } from "@/functions/dataHandlers";
import { FinnanceData } from "@/functions/interfaces";

const DataHandlers = new dataHandlers();
export default async function DebtsCard({
  finnaceData,
}: {
  finnaceData: FinnanceData;
}) {
  const debtsValues = finnaceData.debtsList
    .filter((i) => i.remainingInsts > 0)
    .map((i) => Number(i.value / i.installments))
    .reduce((a, b) => a + b, 0);

  return (
    <div className="group w-48 min-w-[190px] hover:scale-110 transition mobile:order-first">
      <div className="capitalize font-bold text-xl bg-zinc-200 dark:bg-zinc-600 w-full py-1 text-center rounded-t">
        dividas do mês
      </div>
      <div
      title={DataHandlers.localeDecimal(debtsValues)}
      className="w-full h-16 bg-slate-100 border-zinc-200 border-2 rounded-b flex items-center justify-center p-2 ">
        <p className="text-[25px] font-bold text-ellipsis whitespace-nowrap overflow-hidden">
          {DataHandlers.localeDecimal(debtsValues)}
        </p>
      </div>
      <div className="absolute hidden bottom-0 right-0 group-hover:flex"></div>
    </div>
  );
}
