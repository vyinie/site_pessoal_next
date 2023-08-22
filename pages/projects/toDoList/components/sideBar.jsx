import { useEffect, useState } from "react";

export default function SideBar({ setListIndex, list, setList }) {

  function selectList(e) {
    // muda a cor do btn
    list.map((i) => {
      const el = document.getElementById(`savadList${i.id}`);
      el.style.backgroundColor = "";
    });
    e.target.className !== "delList" &&
      (e.target.style.backgroundColor = "#ddd");

    //guarda o id da lista selecionada
    const itemEx = list.filter(
      (i) => i.id == e.target.id.slice(9)
    )[0];
    const newIndex = list.indexOf(itemEx);
    e.target.className !== "delList" && setListIndex(newIndex);
  }

  function delList(e) {
    const newList = list.filter((i) => i.id != e.target.id.slice(10));
    localStorage.setItem("listTodo", JSON.stringify(newList));

    setList((old) => JSON.parse(localStorage.getItem("listTodo")));

    document.getElementById("savadList" + list[0].id).click();
  }

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

  useEffect(() => {
    document.getElementById(`savadList0`).click();
  }, []);

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
        <div className="options">
          <h2 className="titleOptions">listas recorrentes</h2>

          <div className="listsOptions">
            {list.map((i) => (
              <div
                onClick={selectList}
                key={`savadList${i.id}`}
                id={`savadList${i.id}`}
                className="sideBarBtn"
              >
                {i.name}
                <span
                  onClick={delList}
                  id={`delListBtn${i.id}`}
                  className="delList"
                >
                  X
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
