"use client";
import { useState } from "react";

import { DelEditPopOver, MoreOptsBtn } from "../../components/global/buttons";

export default function KbCardMoreOpts({ delCard }: { delCard: () => void }) {
  const [optsToggle, setOptsToggle] = useState(false);

  return (
    <>
      <div className="col-start-6 col-end-6 ">
        <MoreOptsBtn type="dots" func={() => setOptsToggle((old) => !old)}>
          <DelEditPopOver
            delFunc={delCard}
            setEditToggle={setOptsToggle}
            
            optsToggle={optsToggle}
            setOptsToggle={setOptsToggle}
          />
        </MoreOptsBtn>
      </div>
    </>
  );
}
