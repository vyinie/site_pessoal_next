import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface RootCompornentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Root({ children, ...rest }: RootCompornentProps) {
  return (
    <button
      {...rest}
      className={twMerge(
        "w-10 h-10 rounded-full cursor-pointer hover:bg-zinc-300 hover:font-bold",
        rest.className
      )}
    >
      {children}
    </button>
  );
}
