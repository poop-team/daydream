import { AnimatePresence, motion } from "framer-motion";
import { InputHTMLAttributes } from "react";
import { BiError } from "react-icons/bi";

import { transitionVariants } from "../../styles/motion-definitions";

const helperTextVariants = {
  initial: {
    marginTop: "-1.5rem",
    opacity: 0,
  },
  animate: {
    marginTop: "0.25rem",
    opacity: 1,
    transition: {
      marginTop: { duration: 0.2 },
      opacity: { duration: 0.3 },
    },
  },
  exit: {
    marginTop: "-1.5rem",
    opacity: 0,
    transition: {
      marginTop: { duration: 0.2 },
      opacity: { duration: 0.1 },
    },
  },
};

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  startIcon?: JSX.Element | null;
  endIcon?: JSX.Element | null;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  value?: string | undefined;
  helperText?: string;
  className?: string;
  inputClassName?: string;
}

/**
 * @description A text field input component.
 *
 * @param startIcon - An icon to display at the start of the input.
 * @param endIcon - An icon to display at the end of the input.
 * @param disabled - Whether the input is disabled.
 * @param error - Whether the input is in an error state.
 * @param label - The label for the input.
 * @param value - The value of the input. If this is set, the input will be controlled and will not update its own value.
 * @param helperText - The bottom helper text for the input. This will be displayed in red if the input is in an error state.
 * @param className - The class name for the input container.
 * @param inputClassName - The class name for the input element.
 * @param rest - The rest of the props.
 */
export default function TextField({
  startIcon,
  endIcon,
  disabled = false,
  error = false,
  label = "",
  value = undefined,
  helperText = "",
  className = "",
  inputClassName = "",
  ...rest
}: Props) {
  //#region Styles

  let inputStyle =
    "rounded-md bg-transparent px-4 py-2 text-lg border-2 outline-none transition duration-200 ease-out w-full";

  if (!disabled && !error) {
    // Default Style
    inputStyle +=
      " border-slate-500 group-hover:border-indigo-600 focus:border-indigo-600" +
      " dark:border-slate-400 dark:group-hover:border-indigo-500 dark:focus:border-indigo-500";
  } else {
    if (disabled) {
      // Disabled Style
      inputStyle +=
        " cursor-not-allowed bg-slate-100 border-slate-300 dark:bg-slate-800 dark:border-slate-600";
    }
    if (error) {
      // Error Style
      inputStyle +=
        " border-red-500 group-hover:border-red-800 focus:border-red-800 dark:border-red-400 dark:group-hover:border-red-700 dark:focus:border-red-700";
    }
  }

  //#endregion

  return (
    <div className={`group flex flex-col ${className}`}>
      <label className={`ml-1 duration-200 ${error ? "text-red-500" : ""}`}>
        {label}
      </label>
      <div className={"relative z-0 flex"}>
        {startIcon && (
          <div
            className={"absolute left-2 top-1/2 z-10 h-7 w-7 -translate-y-1/2"}
          >
            {startIcon}
          </div>
        )}
        <input
          className={`${inputStyle} ${startIcon ? "pl-10" : ""} ${
            error || endIcon ? "pr-10" : ""
          } ${inputClassName}`}
          disabled={disabled}
          value={value}
          {...rest}
        />
        <AnimatePresence>
          {(endIcon || error) && (
            <motion.div
              initial={"growOut"}
              animate={"growIn"}
              exit={"growOut"}
              variants={transitionVariants}
              className={"absolute right-2 z-10 h-full w-7"}
            >
              {error ? (
                <BiError className={"h-full w-full text-red-500"} />
              ) : (
                endIcon
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {helperText && (
          <motion.p
            initial={"initial"}
            animate={"animate"}
            exit={"exit"}
            variants={helperTextVariants}
            className={`ml-1 ${error ? "text-red-500" : ""}`}
          >
            {helperText}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
