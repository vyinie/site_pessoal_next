"use client";
import { useState } from "react";

import { SetBoo } from "@/functions/interfaces";
import {
  DelEditPopOver,
  ThreeDotsBtn,
} from "@/components/projectsComponents/components/global/buttons";

export default function KbCardMoreOpts({
  delCard,
  setEditToggle,
}: {
  delCard: () => void;
  setEditToggle: SetBoo;
}) {
  const [cardOptsToggle, setCardOptsToggle] = useState(false);

  return (
    <div className="col-start-6 col-end-6 ">
      <ThreeDotsBtn isOn={cardOptsToggle} standing func={() => setCardOptsToggle((old) => !old)}>
        <DelEditPopOver
          delFunc={delCard}
          setEditToggle={setEditToggle}
          optsToggle={cardOptsToggle}
          setOptsToggle={setCardOptsToggle}
        />
      </ThreeDotsBtn>
    </div>
  );
}
