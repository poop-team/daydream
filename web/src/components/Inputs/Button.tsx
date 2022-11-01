import { AnimatePresence } from "framer-motion";
import { ButtonHTMLAttributes, ReactNode } from "react";

import CircularProgress from "../Feedback/CircularProgress";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  loading?: boolean;
  variant?: "filled" | "text";
  className?: string;
  children: ReactNode;
}

/**
 * A button component that can be used to trigger actions.
 *
 * @param disabled - Whether the button is disabled or not.
 * @param loading - Whether the button is loading or not. If true, the button will be disabled.
 * @param variant - The variant can be either "contained" or "text".
 * @param className - Additional styles to apply to the button.
 * @param children - The content of the button.
 * @param rest - Additional props to pass to the button.
 */
export default function Button({
  disabled = false,
  loading = false,
  variant = "filled",
  className = "",
  children,
  ...rest
}: Props) {
  //#region Derived Values

  const isDisabled = disabled || loading;

  //#endregion

  //#region Styles

  let baseStyle =
    "flex select-none items-center justify-center rounded-full gap-2 px-4 py-2 transition duration-200 ease-out " +
    "active:duration-300 focus-visible:ring-4 focus-visible:ring-indigo-300/90 ring-inset outline-none group";

  if (isDisabled) {
    // Disabled Style
    baseStyle +=
      " cursor-not-allowed text-slate-50 bg-indigo-900/80 hover:bg-indigo-900/80";
  } else if (variant === "text") {
    // Text Style
    baseStyle +=
      " hover:bg-slate-300 focus-visible:bg-slate-300 active:scale-[96%]";
  } else {
    // Contained Style
    baseStyle +=
      " text-slate-50 bg-indigo-900 hover:bg-indigo-700 focus-visible:bg-indigo-700 active:scale-[96%]";
  }

  //#endregion

  return (
    <button
      className={`${baseStyle} ${className}`}
      disabled={isDisabled}
      {...rest}
    >
      <AnimatePresence>{loading && <CircularProgress />}</AnimatePresence>
      {children}
    </button>
  );
}
