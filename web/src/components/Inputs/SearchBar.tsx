import { ChangeEvent } from "react";
import { MdClose, MdSearch } from "react-icons/md";

import IconButton from "./IconButton";
import TextField from "./TextField";

interface Props {
  value: string;
  setValue: (value: string) => void;
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
  setValue,
  className = "",
  placeholder = "Search...",
}: Props) {
  //#region Handlers

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClearSearch = () => {
    setValue("");
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
      inputClassName={"py-0 px-4 rounded-3xl"}
      value={value}
      onChange={handleChange}
    />
  );
}
