import { AnimatePresence, motion } from "framer-motion";
import { MdAddCircle, MdArrowBack } from "react-icons/md";

import { transitionVariants } from "../../styles/motion-definitions";
import IconButton from "./IconButton";
import LinkIconButton from "./LinkIconButton";
import SearchBar from "./SearchBar";

interface Props {
  displayBackButton?: boolean;
  onBackButtonClick?: () => void;
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function ProfileSearchBar({
  displayBackButton = false,
  onBackButtonClick = () => {},
  searchValue,
  onSearchValueChange,
  placeholder = "Search...",
  className = "",
}: Props) {
  return (
    <div
      className={`flex w-full items-center justify-center gap-2 ${className}`}
    >
      <AnimatePresence mode={"popLayout"}>
        {displayBackButton && (
          <motion.div
            layout
            key={"profile-collection-back"}
            initial={"growOut"}
            animate={"growIn"}
            exit={"growOut"}
            variants={transitionVariants}
          >
            <IconButton onClick={() => onBackButtonClick()}>
              <MdArrowBack className={"h-full w-10"} />
            </IconButton>
          </motion.div>
        )}
        <motion.div
          key={"profile-collection-search-bar"}
          layout
          className={
            "flex w-11/12 max-w-xl items-center justify-center gap-2 sm:w-2/3"
          }
        >
          <SearchBar
            value={searchValue}
            onValueChange={onSearchValueChange}
            placeholder={placeholder}
            className={"w-full"}
          />
          <LinkIconButton
            href={`/create?prompt=${searchValue}`}
            className={"hidden sm:block"}
          >
            <MdAddCircle className={"h-full w-10"} />
          </LinkIconButton>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
