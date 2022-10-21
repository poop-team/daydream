import { HTMLAttributes } from "react";
import { BiError } from "react-icons/bi";

interface Props extends HTMLAttributes<HTMLInputElement> {
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

  const baseStyle =
    "rounded-md bg-transparent px-4 py-2 text-lg outline outline-2 hover:outline-3 focus:outline-3 transition duration-200 ease w-full";
  const defaultStyle =
    !disabled &&
    !error &&
    "outline-indigo-900 hover:outline-indigo-600 focus:outline-indigo-600";
  const errorStyle =
    error &&
    "pr-12 outline-red-500 hover:outline-red-800 focus:outline-red-800";
  const disabledStyle =
    disabled && "cursor-not-allowed bg-slate-100 outline-slate-300";

  //#endregion

  return (
    <div className={`flex flex-col ${className}`}>
      <label className={`ml-1 ${error && "text-red-500"}`}>{label}</label>
      <div className={"relative flex"}>
        <input
          className={`${baseStyle} ${defaultStyle} ${errorStyle} ${disabledStyle} ${inputClassName}`}
          disabled={disabled}
          value={value}
          {...rest}
        />
        {error && (
          <BiError
            className={"absolute top-1.5 right-2 h-8 w-8 text-red-500"}
          />
        )}
      </div>
      <p className={`ml-1 mt-1 ${error && "text-red-500"}`}>{helperText}</p>
    </div>
  );
}
