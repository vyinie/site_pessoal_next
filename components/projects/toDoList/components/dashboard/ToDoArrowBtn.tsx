import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function ToDoArrowBtn({
  left,
  className,
}: {
  left?: boolean;
  className?: string;
}) {
  function scroll() {
    const el = document.getElementsByClassName("list");
    if (left) {
      el.item(0)?.scrollBy(-608, 0);
    } else {
      el.item(0)?.scrollBy(608, 0);
    }
  }
  return (
    <div
      className={`${className || ""} absolute bottom-0 ${
        left ? "-left-12" : "-right-12"
      } btn_hover_md items-center h-full `}
      onClick={scroll}
    >
      {left ? (
        <ArrowForwardIosIcon
          className="rotate-180"
          style={{ fontSize: "40px" }}
        />
      ) : (
        <ArrowForwardIosIcon style={{ fontSize: "40px" }} />
      )}
    </div>
  );
}
