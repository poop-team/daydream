import { AnimatePresence, motion } from "framer-motion";
import { ButtonHTMLAttributes, ReactNode } from "react";

import { variants } from "../../styles/motion-definitions";

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
      <AnimatePresence>
        {loading && (
          <motion.svg
            initial={variants.fadeOut}
            animate={variants.fadeIn}
            exit={variants.fadeOut}
            className="h-5 w-5"
          >
            <motion.circle
              cx={10}
              cy={10}
              r="8"
              stroke="currentColor"
              strokeWidth="3"
              fill="transparent"
              strokeDasharray={40}
              animate={{
                rotate: [0, 360, 0],
                strokeDashoffset: [80, 30, 80],
                transition: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 1.6,
                },
              }}
            />
          </motion.svg>
        )}
      </AnimatePresence>
      {children}
    </button>
  );
}
