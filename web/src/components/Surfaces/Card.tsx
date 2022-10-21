import { HTMLAttributes, ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
}

export default function Card({
  className = "",
  children = null,
  ...rest
}: Props) {
  return (
    <div className={`rounded-xl shadow-lg ${className}`} {...rest}>
      {children}
    </div>
  );
}
