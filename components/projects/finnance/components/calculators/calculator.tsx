"use client";

import Compound from "./compound";
import Toggle from "./toggle";
import Simple from "./simple";
import { useState } from "react";

export default function FeesCalculator() {
  const [isCompoud, setisCompoud] = useState(true);

  return (
    <div className="w-full h-full flex flex-col items-center gap-16 mobile:gap-12">
      {/* toggle */}
      <Toggle calculator={isCompoud} setCalculator={setisCompoud}/>

      {/* calc */}
      {isCompoud ? <Compound /> : <Simple />}
    </div>
  );
}
