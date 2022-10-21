import { AnimatePresence } from "framer-motion";
import { ButtonHTMLAttributes, ReactNode } from "react";

import CircularProgress from "../Feedback/CircularProgress";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  children: ReactNode;
}

export default function Button({
  disabled = false,
  loading = false,
  className = "",
  children,
  ...rest
}: Props) {
  //#region Styles

  const baseStyle =
    "flex select-none items-center rounded-full gap-2 px-4 py-2 text-slate-50 transition duration-200 ease-out " +
    "active:duration-300 focus-visible:ring-4 focus-visible:ring-indigo-300/90 ring-inset outline-none";
  const primaryStyle =
    "bg-indigo-900 hover:bg-indigo-700 focus-visible:bg-indigo-700 active:scale-[96%]";
  const disabledStyle =
    "cursor-not-allowed bg-indigo-900/80 hover:bg-indigo-900/80";

  //#endregion

  //#region Derived Values

  const isDisabled = disabled || loading;

  //#endregion

  return (
    <button
      className={`${baseStyle} ${
        isDisabled ? disabledStyle : primaryStyle
      } ${className}`}
      disabled={isDisabled}
      {...rest}
    >
      <AnimatePresence>{loading && <CircularProgress />}</AnimatePresence>
      {children}
    </button>
  );
}
