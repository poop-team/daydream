import { ReactNode } from "react";
import { Pressable, Text, PressableProps } from "react-native";

interface Props extends PressableProps {
  name: string;
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
  pilled?: boolean;
}

/**
 * name - (string) button text (required).
 * className - (string) additional button styling (required).
 * children - (jsx tags/component)(optional) ie. pass in an icon (optional).
 * onPress - (function) button click handler. (optional) (default: ()=>{})
 * disabled - (boolean) calling this in the prop will grey the button out(optional).
 * pilled - (boolean) calling this will round the button all the way(optional).
 */

export default function Button({
  name,
  className = "",
  children = null,
  disabled = false,
  pilled = false,
  ...props
}: Props) {
  //warning: do not touch the extra spaces at the beginning or it will break the styling
  let baseStyle = "h-7 items-center justify-center";
  let textStyle = "text-white margin mx-5 font-semibold";

  if (disabled) {
    baseStyle += " text-slate-50 bg-indigo-900/40 hover:bg-indigo-900/80";
  } else {
    baseStyle +=
      " text-slate-50 bg-indigo-900 hover:bg-indigo-800 active:opacity-70";
  }
  if (pilled) {
    baseStyle += " rounded-full";
  } else {
    baseStyle += " rounded-md";
  }

  return (
    <Pressable className={`${baseStyle} ${className}`} {...props}>
      {name && <Text className={textStyle}>{name}</Text>}
      {children}
    </Pressable>
  );
}
