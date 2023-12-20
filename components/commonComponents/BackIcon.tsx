import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

// btn de backfoward
export default function BackIcon({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={twMerge(
        "top-1/2 -translate-y-1/2 absolute left-2 z-10 flex items-center justify-center transition rounded-full cursor-pointer w-11 h-11 hover:bg-neutral-300",
        className
      )}
    >
      <ArrowBackIcon sx={{ fontSize: "30px" }} />
    </Link>
  );
}
