import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

// btn de backfoward
export default function BackIcon({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`${
        className || "top-1/2 translate-x-1/2 w-24"
      } bg-sky-500 absolute left-0  z-10 flex items-center justify-center h-11 rounded-r-full cursor-pointer`}
    >
      <ArrowBackIcon sx={{ fontSize: "30px" }} />
    </Link>
  );
}
