import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export default function IconButton({
  disabled,
  className = "",
  children,
  ...rest
}: Props) {
  //#region Styles

  const baseStyle =
    "flex select-none items-center gap-2 rounded-full outline-none transition duration-200 ease-out active:duration-300";
  const primaryStyle = "text-slate-900 hover:text-indigo-700 active:scale-90";
  const disabledStyle =
    "cursor-not-allowed text-slate-900/80 hover:text-slate-900/80";

  //#endregion

  return (
    <button
      className={`${baseStyle} ${
        disabled ? disabledStyle : primaryStyle
      } ${className}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
