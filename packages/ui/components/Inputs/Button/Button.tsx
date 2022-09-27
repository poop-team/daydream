import { motion, MotionProps } from "framer-motion";
import React, { ReactNode, useContext } from "react";

import { ThemeContext } from "../../../context/ThemeProvider";

export interface ButtonProps extends MotionProps {
  text?: string;
  disabled?: boolean;
  color?: string;
  size?: "small" | "medium" | "large";
  className?: string;
  children?: ReactNode;
}

export default function Button({
  text,
  color = "primary",
  disabled,
  size = "medium",
  children,
  className = "",
  ...rest
}: ButtonProps) {
  //#region Hooks

  const { theme } = useContext(ThemeContext);

  //#endregion

  const classNames = {
    base: `px-2 py-1 rounded-2xl border-primary-light border-8 shadow-weak text-white dark:text-black bg-${color}-dark dark:bg-primary-light transition-all duration-180 ease-in-out`,
    hover: `hover:scale-105 hover:shadow-medium hover:text-black hover:bg-${color}-light dark:hover:text-white dark:hover:bg-transparent`,
    active: `active:scale-95 active:shadow-weak`,
    disabled: "opacity-50",
  };

  console.log(classNames.base);

  return (
    <motion.button
      className={`${classNames.base} ${
        disabled
          ? classNames.disabled
          : classNames.hover + " " + classNames.active
      }`}
      disabled={disabled}
      {...rest}
    >
      {text || children}
    </motion.button>
  );
}
