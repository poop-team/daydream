import { ReactNode } from "react";
import { Pressable, Text } from "react-native";

interface Props {
  name: string;
  className: string;
  children: ReactNode[];
  disabled?: boolean;
  pilled?: boolean;
}

/**
 * buttonName - name of the button.
 * addButtonStyle - add custom style to the button.
 * children - if you want to add your own text with styles.
 * pilled - make the button pilled (optional).
 * disabled - greys out button (optional).
 */
export default function Button({
  name,
  className,
  children,
  disabled = false,
  pilled = false,
}: Props) {
  let baseStyle = "h-7 items-center justify-center";
  let textStyle = "text-white margin mx-5 font-semibold";

  if (disabled) {
    baseStyle += "text-slate-50 bg-indigo-900/40 hover:bg-indigo-900/80";
  } else {
    baseStyle +=
      "text-slate-50 bg-indigo-900 hover:bg-indigo-800 active:opacity-70";
  }
  if (pilled) {
    baseStyle += "rounded-full";
  } else {
    baseStyle += "rounded-md";
  }

  return (
    <Pressable className={`${baseStyle} ${className}`}>
      {name && <Text className={textStyle}>{name}</Text>}
      {children}
    </Pressable>
  );
}
