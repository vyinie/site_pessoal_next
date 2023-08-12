import { useEffect, useState } from "react";

export default function SideBar({ list }) {
  const [sideBarToggle, setSideBarToggle] = useState(false);
  const handlerSidetoggle = () => {
    setSideBarToggle(!sideBarToggle);

    for (let i = 1; i <= 3; i++) {
      const line = document.getElementById("line" + i);
      line.classList.toggle("on", sideBarToggle);
    }

    const wrapper = document.querySelector(".listsOptionsWrapper");
    wrapper.style.display = sideBarToggle ? "flex" : "";
  };
  const closeSideBar = (e) => {
    const arr = ["listsOptionsWrapper", "sideBarBtn"];
    const checker = arr.some((i) => e.target.className == i);
    checker && handlerSidetoggle();
  };
  return (
    <div onClick={closeSideBar} className="sideBar">
      <div onClick={handlerSidetoggle} className="toggleLists">
        <div id="line1" className="lineToggle"></div>
        <div id="line2" className="lineToggle"></div>
        <div id="line3" className="lineToggle"></div>
      </div>
      <div className="listsOptionsWrapper">

      </div>
    </div>
  );
}
