"use client";
import { useState } from "react";

import { DelEditPopOver, MoreOptsBtn } from "../../components/global/buttons";
import { SetBoo } from "@/functions/interfaces";

export default function KbCardMoreOpts({
  delCard,
  setEditToggle,
}: {
  delCard: () => void;
  setEditToggle: SetBoo;
}) {
  const [optsToggle, setOptsToggle] = useState(false);

  return (
    <div className="col-start-6 col-end-6 ">
      <MoreOptsBtn type="dots" func={() => setOptsToggle((old) => !old)}>
        <DelEditPopOver
          delFunc={delCard}
          setEditToggle={setEditToggle}
          optsToggle={optsToggle}
          setOptsToggle={setOptsToggle}
        />
      </MoreOptsBtn>
    </div>
  );
}
