import { ChangeEvent, InputHTMLAttributes } from "react";
import { MdClose, MdSearch } from "react-icons/md";

import IconButton from "./IconButton";
import TextField from "./TextField";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

/**
 * A search bar component.
 *
 * @param value - The value of the search bar.
 * @param setValue - A function to set the value whenever something is entered into the search bar.
 * @param className - Additional styles to apply.
 * @param placeholder - The placeholder text to display.
 */
export default function SearchBar({
  value,
  onValueChange,
  className = "",
  placeholder = "Search...",
  ...props
}: Props) {
  //#region Handlers

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onValueChange(e.target.value);
  };

  const handleClearSearch = () => {
    onValueChange("");
  };

  //#region Derived State

  const isSearchActive = value.length > 0;

  //#endregion

  return (
    <TextField
      startIcon={<MdSearch className={"h-full w-full"} />}
      endIcon={
        isSearchActive ? (
          <IconButton className={"h-full w-full"} onClick={handleClearSearch}>
            <MdClose className={"h-full w-full"} />
          </IconButton>
        ) : null
      }
      placeholder={placeholder}
      className={className}
      inputClassName={"!rounded-full py-0.5 px-4"}
      value={value}
      onChange={handleChange}
      {...props}
    />
  );
}
