import { SetBoo, debt } from "@/functions/interfaces";
import { dataHandlers } from "@/functions/dataHandlers";
import { accessibility } from "@/functions/accessibilityFunctions";

const DataHandlers = new dataHandlers();
export function DebtInfoCard({
  info,
  open,
  setOpen,
}: {
  info: debt;
  open: boolean;
  setOpen: SetBoo;
}) {
  function dateSetter(dateISO: string, monToSum: number) {
    const d1: string = dateISO.split("T")[0] + " ";
    const d2: number = new Date(d1).getMonth();
    const d3 = new Date(d1).setMonth(d2 + monToSum);
    const d4 = new Date(d3).toISOString();
    return DataHandlers.localeDate(d4);
  }

  const Access = new accessibility();

  return (
    <div
      onClick={(e) => Access.closeWrapper(e, setOpen)}
      className={`${
        open ? "z-10 opacity-100" : "-z-10 opacity-0"
      } wrapper close-on-click`}
    >
      <div className="flex flex-col rounded-md p-2 bg-gray-100 dark:bg-neutral-700 w-fit min-w-[300px] mobile-sm:w-[90%]">
        {/* ================== nome ================== */}
        <div className="border-neutral-500 border-b-2 py-2 grid grid-cols-2 grid-rows-1 items-center">
          <p className="font-bold place-self-start text-start w-fit">nome: </p>
          <p>{info.name}</p>
        </div>

        {/* ================== mensalidade ================== */}
        <div className="border-neutral-500 border-b-2 py-2 grid grid-cols-2 grid-rows-1 items-center">
          <p className="font-bold place-self-start text-start w-fit">mensalidade: </p>
          <p>
            R$
            {DataHandlers.localeDecimal(
              (info.value / info.installments).toString().replace(".", ",")
            )}
          </p>
        </div>

        {/* ================== parcelas restantes ================== */}
        <div className="border-neutral-500 border-b-2 py-2 grid grid-cols-2 grid-rows-1 items-center">
          <p className="font-bold place-self-start text-start w-fit">parcelas restantes: </p>
          <p>{info.remainingInsts}</p>
        </div>

        {/* ================== parcelas totais ================== */}
        <div className="border-neutral-500 border-b-2 py-2 grid grid-cols-2 grid-rows-1 items-center">
          <p className="font-bold place-self-start text-start w-fit">parcelas totais: </p>
          <p>{info.installments}</p>
        </div>

        {/* ================== valor total ================== */}
        <div className="border-neutral-500 border-b-2 py-2 grid grid-cols-2 grid-rows-1 items-center">
          <p className="font-bold place-self-start text-start w-fit">valor total: </p>
          <p>
            R$
            {DataHandlers.localeDecimal(
              info.value.toString().replace(".", ",")
            )}
          </p>
        </div>
        {/* ================== data ================== */}
        <div className="border-neutral-500 border-b-2 py-2 grid grid-cols-2 grid-rows-1 items-center">
          <p className="font-bold place-self-start text-start w-fit">data de inicio: </p>
          <p>{DataHandlers.localeDate(info.date)}</p>
        </div>

        {/* ================== expectativa ================== */}
        <div className="py-2 grid grid-cols-2 grid-rows-1 items-center">
          <p className="font-bold place-self-start text-start w-fit">expectativa de fim: </p>
          <p>{dateSetter(info.date, info.installments)}</p>
        </div>
      </div>
    </div>
  );
}
