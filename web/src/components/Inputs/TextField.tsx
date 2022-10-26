import { HTMLAttributes } from "react";
import { BiError } from "react-icons/bi";

interface Props extends HTMLAttributes<HTMLInputElement> {
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
    "rounded-md bg-transparent px-4 py-2 text-lg outline outline-2 hover:outline-3 focus:outline-3 transition duration-200 ease w-full";

  if (!disabled && !error) {
    // Default Style
    inputStyle +=
      " outline-slate-500 group-hover:outline-indigo-600 focus:outline-indigo-600";
  } else {
    if (disabled) {
      // Disabled Style
      inputStyle += " cursor-not-allowed bg-slate-100 outline-slate-300";
    }
    if (error) {
      // Error Style
      inputStyle +=
        " outline-red-500 group-hover:outline-red-800 focus:outline-red-800";
    }
  }

  //#endregion

  return (
    <div className={`group flex flex-col ${className}`}>
      <label className={`ml-1 ${error ? "text-red-500" : ""}`}>{label}</label>
      <div className={"relative flex"}>
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
        {(endIcon || error) && (
          <div
            className={"absolute right-2 top-1/2 z-10 h-7 w-7 -translate-y-1/2"}
          >
            {error ? (
              <BiError className={"h-full w-full text-red-500"} />
            ) : (
              endIcon
            )}
          </div>
        )}
      </div>
      {helperText && (
        <p className={`ml-1 mt-1 ${error ? "text-red-500" : ""}`}>
          {helperText}
        </p>
      )}
    </div>
  );
}
