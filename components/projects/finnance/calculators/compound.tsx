/* export default function Compound() {
  const dataHandlers = new DataHandlers();

  const [CompoundData, setCompoundData] = useState<Compound>({
    initialValue: 0,
    monthlyValue: 0,
    interestRate: 0,
    aplicationTime: 0,
  });
  const [timePeriod, setTimePeriod] = useState("anos");
  const [resust, setResust] = useState({ onlyInterest: "", amount: "" });
  function toISO() {
    // separa as keys
    const keys = Object.keys(CompoundData);

    // converte os numeros para ISO
    const newData = keys.map((i) => ({
      [i]: Number(
        CompoundData[i].toString().replaceAll(".", "").replaceAll(",", ".")
      ),
    }));

    // transforma em obj
    // @ts-ignore
    const newCompound: Compound = newData.reduce((a, b) => ({ ...a, ...b }));

    return newCompound;
  }
  function calculateComp() {
    const data = toISO();

    let fixedValue = data.initialValue;
    let fee = data.interestRate / 100;
    const time =
      timePeriod === "anos" ? data.aplicationTime * 12 : data.aplicationTime;

      let value = data.initialValue * (1 + fee) *time;
      
      for (let i = 0; i < time; i++) {

    }

    const ISOvalue = dataHandlers.localeDecimal(
      value.toString().replace(".", ",")
    );

    const interest = dataHandlers.localeDecimal(
      (value - fixedValue).toString().replace(".", ",")
    );

    setResust(() => ({
      amount: "R$ " + value.toLocaleString(),
      onlyInterest: "R$" + interest,
    }));
  }

  return (
    <div className="flex flex-wrap gap-10 items-center justify-center">
      <div
        onChange={(e) => dataHandlers.getData(e, setCompoundData)}
        className="flex flex-col gap-3"
      >
        <CommonInp
          name="initialValue"
          type="number"
          placeholder="valor inicial"
          width="300px"
          inpValue={
            CompoundData.initialValue == 0 ? "" : CompoundData.initialValue
          }
        />

        <CommonInp
          name="monthlyValue"
          type="number"
          placeholder="valor mensal"
          width="300px"
          inpValue={
            CompoundData.monthlyValue == 0 ? "" : CompoundData.monthlyValue
          }
        />

        <div className="flex">
          <CommonInp
            name="interestRate"
            type="number"
            placeholder="taxa de juros"
            width="204px"
            className="rounded-r-none"
            inpValue={
              CompoundData.interestRate == 0 ? "" : CompoundData.interestRate
            }
          />

          <div className=" bg-purple-650 text-white font-bold text-lg rounded-r-md w-24 px-1 grid place-items-center">
            % ao ano
          </div>
        </div>

        <div className="flex">
          <CommonInp
            name="aplicationTime"
            type="number"
            placeholder="periodo de aplicação"
            width="220px"
            inpValue={
              CompoundData.aplicationTime == 0
                ? ""
                : CompoundData.aplicationTime
            }
            className="rounded-r-none"
          />

          <ClassInp
            classList={[
              //@ts-ignore
              { Class: "anos", id: 0 },
              //@ts-ignore
              { Class: "meses", id: 1 },
            ]}
            inpValue={timePeriod}
            dataHandler={(e) => setTimePeriod(e.target.textContent)}
            widith="w-[80px]"
            bgColor="bg-purple-650 dark:bg-purple-650 hover:bg-purple-700 text-white rounded-l-none border-0 font-bold dark:text-opacity-100"
          />
        </div>

        <button
          onClick={calculateComp}
          className="capitalize px-10 py-2 rounded-md bg-purple-650 text-white font-bold text-xl hover:bg-purple-700 transition"
        >
          calcular
        </button>
      </div>

      <div className="h-40 w-52 dark:opacity-100 rounded-md text-2xl font-bold bg-purple-650 grid row-span-4 place-items-center capitalize">
        {/* <p>apenas os juros</p>
        {resust.onlyInterest || ""} }
        <hr className="w-11/12 " />
        <p>total</p>
        {resust.amount || ""}
      </div>
    </div>
  );
} */
export default function Compound() {
  return <div className=" font-bold text-xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 whitespace-nowrap">EM DESENVOLVIMENTO...</div>;
}
