import { useState } from "react";

function SideBar({ delAllItems, addCard, delAllCards }) {
  const [sideBarToggle, setSideBarToggle] = useState(true);
  const handlerSidetoggle = () => {
    setSideBarToggle(!sideBarToggle);

    for (let i = 1; i <= 3; i++) {
      const line = document.getElementById("line" + i);
      line.classList.toggle("on", sideBarToggle);
    }

    const wrapper = document.querySelector(".KBsideBarWrapper");
    wrapper.style.opacity = sideBarToggle ? "1" : "";
    wrapper.style.zIndex = sideBarToggle ? "3" : "";

    const aside = document.querySelector(".KBsideBar");
    aside.style.right = sideBarToggle ? "0" : "-70vw";
  };

  const closeSideBar = (e) => {
    const arr = ["KBsideBarWrapper", "KBsideBarBtn"];
    const checker = arr.some((i) => e.target.className == i);
    checker && handlerSidetoggle();
  };

  return (
    <div>
      <div onClick={handlerSidetoggle} className="toggleLists">
        <div id="line1" className="lineToggle"></div>
        <div id="line2" className="lineToggle"></div>
        <div id="line3" className="lineToggle"></div>
      </div>

      <div onClick={closeSideBar} className="KBsideBarWrapper">
        <div className="KBsideBar">
          <span onClick={addCard} className="KBsideBarBtn" id="addKbCard">
            Adicionar Card
          </span>
          <span
            onClick={delAllItems}
            className="KBsideBarBtn"
            id="delAllKbItem"
          >
            Apagar Todos os items
          </span>
          <span
            onClick={delAllCards}
            className="KBsideBarBtn"
            id="delAllKbCard"
          >
            Apagar Todos os Cards
          </span>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
