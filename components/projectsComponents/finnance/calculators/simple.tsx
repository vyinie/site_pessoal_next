"use client";
import { useState } from "react";
import { dataHandlers } from "@/functions/dataHandlers";
import { CommonInp, SelectInp } from "@/components/projectsComponents/components/global/inputs";

export default function Simple() {
  const DataHandlers = new dataHandlers();

  const [SimpleData, setSimpleData] = useState({
    value: 0,
    interestRate: 0,
    aplicationTime: 0,
  });
  const [timePeriod, setTimePeriod] = useState("meses");
  const [resust, setResust] = useState({ onlyInterest: "", amount: "" });

  function toISO() {
    // separa as keys
    const keys = Object.keys(SimpleData);

    // checa se todos os inputs foram preenchidos
    if (keys.every((i) => typeof SimpleData[i] === "string")) {
      // converte os numeros para ISO
      const newData = keys.map((i) => ({
        [i]: Number(SimpleData[i].replaceAll(".", "").replaceAll(",", ".")),
      }));

      // transforma em obj
      // @ts-ignore
      const newCompound: Compound = newData.reduce((a, b) => ({ ...a, ...b }));
      return newCompound;
    }
  }
  function calculate() {
    const data = toISO();

    let currentValue = data.value;

    const time =
      timePeriod === "anos" ? data.aplicationTime * 12 : data.aplicationTime;

    for (let i = 0; i < time; i++) {
      const percent = currentValue * (data.interestRate / 100);
      currentValue += percent;
    }
    const interest = DataHandlers.localeDecimal(
      (currentValue - data.value).toString().replace(".", ",")
    );
    const ISOvalue = DataHandlers.localeDecimal(
      currentValue.toString().replace(".", ",")
    );
    setResust(() => ({
      amount: "R$" + ISOvalue,
      onlyInterest: "R$" + interest,
    }));
  }

  return (
    <div className="flex flex-wrap gap-10 items-center justify-center">
      <div
        onChange={(e) => DataHandlers.getData(e, setSimpleData)}
        className="flex flex-col gap-3"
      >
        <CommonInp
          name="value"
          type="number"
          placeholder="valor"
          w="w-[300px]"
          inpValue={SimpleData.value == 0 ? "" : SimpleData.value}
        />

        <div className="flex">
          <CommonInp
            name="interestRate"
            type="number"
            placeholder="taxa de juros"
            w="w-[256px]"
            className="rounded-r-none"
            inpValue={
              SimpleData.interestRate == 0 ? "" : SimpleData.interestRate
            }
          />

          <div className=" bg-emerald-250 text-zinc-700 font-bold text-xl rounded-r-md w-11 px-1 grid place-items-center">
            %
          </div>
        </div>

        <div className="flex">
          <CommonInp
            name="aplicationTime"
            type="number"
            placeholder="periodo de aplicação"
            w="w-[220px]"
            inpValue={
              SimpleData.aplicationTime == 0 ? "" : SimpleData.aplicationTime
            }
            className="rounded-r-none"
          />

          <SelectInp
            list={[
              //@ts-ignore
              { Class: "anos", id: 0 },
              //@ts-ignore
              { Class: "meses", id: 1 },
            ]}
            inpValue={timePeriod}
            dataHandler={(e) => setTimePeriod(e.target.textContent)}
            widith="w-[80px]"
            bgColor="bg-emerald-250 dark:bg-emerald-250 hover:bg-emerald-300 dark:hover:bg-emerald-300 text-zinc-700 rounded-l-none border-0 font-bold dark:text-zinc-700 dark:text-opacity-100"
          />
        </div>

        <button
          onClick={calculate}
          className="capitalize px-10 py-2 rounded-md bg-emerald-250 text-zinc-700 font-bold text-xl hover:bg-emerald-300 transition"
        >
          calcular
        </button>
      </div>

      <div className="h-40 w-52 rounded-md text-zinc-700 text-2xl font-bold bg-emerald-250 grid row-span-4 place-items-center capitalize">
        <p>apenas os juros</p>
        {resust.onlyInterest || ""}
        <hr className="w-11/12 border-zinc-700" />
        <p>total</p>
        {resust.amount || ""}
      </div>
    </div>
  );
}
