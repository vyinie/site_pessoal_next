"use client";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";

// btn de backfoward
export default function BackIcon({ className }: { className?: string }) {
  const navigate = useRouter();
  return (
    <div
      className={`${
        className || ""
      } bg-sky-500 absolute left-0 top-1/2 translate-x-1/2 z-10 flex items-center justify-center w-24 h-11 rounded-r-full cursor-pointer`}
      onClick={() => navigate.back()}
    >
      <ArrowBackIcon sx={{ fontSize: "30px" }} />
    </div>
  );
}
