import { ReactNode } from "react";

interface IconComponentProps {
  icon: ReactNode;
}

export function Icon({ icon }: IconComponentProps) {
  return <div className="w-fit h-fit">{icon}</div>;
}
