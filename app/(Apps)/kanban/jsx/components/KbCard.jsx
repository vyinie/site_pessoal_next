import { useRef, useState } from "react";
import { Popover } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Modal, TextField } from "@mui/material";

const KbCard = ({
  color,
  name,
  items,
  cardId,
  itemId,
  setItemId,
  lists,
  setLists,
}) => {
  const refChecked = useRef();
  const [modalAddItem, setModalAddItem] = useState(false);
  // ================ abre o modal pra add items ================
  function toggleModal() {
    setModalAddItem(!modalAddItem);
    !modalAddItem &&
      setTimeout(() => {
        document.getElementById(`inpAddItem${cardId}`).focus();
      }, 50);
  }

  // ================ adiciona um item ao card especifico ================
  const [itemName, setItemName] = useState(null);

  function addItem(e) {
    const keepOpen = refChecked.current.checked;
    if (itemName !== null) {
      const target = e.target.id.slice(10);
      const arr = lists.filter((i) => i.id == target)[0];
      const index = lists.indexOf(arr);

      lists[index].items.push({ text: itemName, id: itemId });
      localStorage.setItem;

      setItemId(itemId + 1);
      setItemName(null);

      document.getElementById(`inpAddItem${cardId}`).value = null;
      !keepOpen && toggleModal();
    }
  }

  function delItem(e) {
    const newItemArr = items.filter((i) => i.id != e.target.id.slice(8));
   
    const arr = lists.find((i) => i.id == cardId)
    const index = lists.indexOf(arr);
    lists[index].items = newItemArr;

    localStorage.setItem("lists", JSON.stringify(lists));
    setLists(() => JSON.parse(localStorage.getItem("lists")));

    setAnchorEl(null);
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const open = Boolean(anchorEl);
  return (
    <div
      id={"kbCard" + cardId}
      className="kbCard"
      style={{ backgroundColor: color }}
    >
      {/* ================ imput pra add item ================ */}
      <div>
        <Modal
          open={modalAddItem}
          onClose={toggleModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modalPopUpWrapper"
        >
          <Box className="modalPopUp">
            <TextField
              fullWidth
              variant="filled"
              label="Nome do item"
              className="kbAddItem"
              id={`inpAddItem${cardId}`}
              onChange={(e) => setItemName(e.target.value)}
              onKeyDown={(e) => {
                e.key === "Enter" && addItem(e);
              }}
            />

            <div className="keepOpen">
              <input
                defaultChecked
                type="checkbox"
                id={"keepOpenCheck" + cardId}
                ref={refChecked}
              />
              <label
                className="keepOpenLabel"
                htmlFor={"keepOpenCheck" + cardId}
              >
                manter aberto
              </label>
            </div>

            <Button
              variant="contained"
              color="error"
              className="btnCancelAddItem"
              onClick={() => {
                document.getElementById(`inpAddItem${cardId}`).value = null;
                setModalAddItem(false);
              }}
            >
              Cancelar
            </Button>

            <Button
              variant="contained"
              className="btnAddItem"
              id={`btnAddItem${cardId}`}
              onClick={(e) => addItem(e)}
            >
              Adicionar
            </Button>
          </Box>
        </Modal>
      </div>
      {/* ================ titulo do card ================ */}

      <div className="headerCard">
        <p className="cardTitle">{name}</p>
        <AddIcon
          onClick={toggleModal}
          className="addKbItem btnHover"
          id={`kbAddItem${cardId}`}
        />
      </div>

      {/* ================ iteNS do card ================ */}
      <div className="bodyCard">
        {items.map((t) => (
          // ================ iteM do card ================
          /*<KbItem
            id={t.id}
            text={t.text}
            items={items}
            cardId={cardId}
            itemId={itemId}
            lists={lists}
            setLists={setLists}
          />*/
          <div id={`item${t.id}`} key={"key" + t.id} className="cardItem">
            <p className="kbItemText">{t.text}</p>
            <MoreVertOutlinedIcon onClick={handleClick} className="kbMoreOpt" />
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <div className="kbPopover">
                <span className="dadCover">
                  <div
                    onClick={delItem}
                    id={"deletbtn" + t.id}
                    className="btnHover cover"
                  ></div>
                  <DeleteIcon />
                </span>
                <hr />
                <span className="dadCover">
                  <div id={"editbtn" + t.id} className="btnHover cover"></div>
                  <EditIcon className="btnHover" />
                </span>
              </div>
            </Popover>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KbCard;
