import { AnimatePresence, motion } from "framer-motion";
import { MdAddCircle, MdArrowBack, MdDelete } from "react-icons/md";

import { transitionVariants } from "../../styles/motion-definitions";
import Button from "./Button";
import IconButton from "./IconButton";
import PopoverButton from "./PopoverButton";
import SearchBar from "./SearchBar";

interface Props {
  displayBackButton?: boolean;
  displayRemoveButton?: boolean;
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  isAddButtonDisabled?: boolean;
  onBackButtonClick?: () => void;
  onAddButtonClick?: () => void;
  onRemoveButtonClick?: () => void;
  displayAddButton?: boolean;
  placeholder?: string;
  removePopoverText?: string;
  className?: string;
}

export default function ProfileSearchBar({
  displayBackButton = false,
  displayAddButton = false,
  displayRemoveButton = false,
  searchValue,
  onSearchValueChange,
  isAddButtonDisabled = false,
  onBackButtonClick = () => {},
  onAddButtonClick = () => {},
  onRemoveButtonClick = () => {},
  placeholder = "Search...",
  removePopoverText = "Are you sure?",
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
            "flex h-10 w-11/12 max-w-xl items-center justify-center gap-2 sm:w-2/3"
          }
        >
          <SearchBar
            value={searchValue}
            onValueChange={onSearchValueChange}
            placeholder={placeholder}
            className={"w-full"}
            onKeyUp={(e) => {
              if (e.key === "Enter" && !isAddButtonDisabled) {
                onAddButtonClick();
              }
            }}
          />
          <AnimatePresence mode={"wait"}>
            {displayAddButton && (
              <motion.div
                key={"profile-search-add-button"}
                initial={"growOut"}
                animate={"growIn"}
                exit={"growOut"}
                variants={transitionVariants}
              >
                <IconButton
                  onClick={onAddButtonClick}
                  disabled={isAddButtonDisabled}
                >
                  <MdAddCircle className={"h-full w-10"} />
                </IconButton>
              </motion.div>
            )}
            {displayRemoveButton && (
              <motion.div
                key={"profile-search-remove-button"}
                initial={"growOut"}
                animate={"growIn"}
                exit={"growOut"}
                variants={transitionVariants}
              >
                <PopoverButton
                  button={IconButton}
                  buttonChildren={<MdDelete className={"h-full w-10"} />}
                  popoverPlacement={"top"}
                >
                  {({ close }) => (
                    <div className={"w-56 p-2"}>
                      <p className={"text-center text-lg font-bold"}>
                        {removePopoverText}
                      </p>
                      <div className={"mt-4 flex justify-center gap-2"}>
                        <Button
                          variant={"text"}
                          onClick={() => {
                            onRemoveButtonClick();
                            close();
                          }}
                          className={"w-1/2"}
                        >
                          Yes
                        </Button>
                        <Button onClick={close} className={"w-1/2"}>
                          No
                        </Button>
                      </div>
                    </div>
                  )}
                </PopoverButton>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
