"use client";
export default function Toggle({ calculator, setCalculator }) {
  function calculatorHandler() {
    setCalculator((old) => !old);
  }
  return (
    <div className="capitalize flex flex-wrap justify-center mt-10 font-bold text-xl mobile: gap-2">
      {/* compostos */}
      <div
        className={`${
          calculator ? "bg-purple-650 text-white" : ""
        } h-12 w-52 flex justify-center items-center border-2 border-neutral-400 relative transition rounded-lg`}
      >
        <div onClick={calculatorHandler} className="kase"></div>
        <p>juros compostos</p>
      </div>

      {/* simples */}
      <div
        className={`
    ${
      !calculator ? "bg-emerald-250 dark:text-black" : ""
    } h-12 w-52 flex justify-center items-center border-2 border-neutral-400 relative transition rounded-lg`}
      >
        <div onClick={calculatorHandler} className="kase"></div>
        <p>juros simples</p>
      </div>
    </div>
  );
}
