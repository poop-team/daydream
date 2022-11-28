import { AnimatePresence, motion } from "framer-motion";
import { MdAdd, MdCheck } from "react-icons/md";

import {
  transitions,
  transitionVariants,
} from "../../styles/motion-definitions";

interface Props {
  label: string;
  selected: boolean;
  onSelect: (style: string, selected: boolean) => void;
  className?: string;
}

export default function SelectableChip({
  label,
  selected,
  onSelect,
  className = "",
}: Props) {
  //#region Handlers

  const handleClick = () => {
    onSelect(label, !selected);
  };

  //#endregion

  //#region Styles

  let styles =
    "flex gap-2 px-2 py-0.5 sm:px-4 sm:py-1 rounded-full transition duration-200 ease-in-out outline-none focus-visible:ring-2 focus-visible:ring-offset-2 items-center";
  styles += selected
    ? " text-slate-50 bg-indigo-900 hover:bg-indigo-700 focus-visible:bg-indigo-700 focus-visible:ring-indigo-700" +
      " dark:text-slate-900 dark:bg-indigo-200 dark:hover:bg-indigo-400 dark:focus-visible:bg-indigo-400 dark:focus-visible:ring-indigo-400"
    : " bg-slate-200 text-slate-900 hover:bg-slate-300 focus-visible:bg-slate-300 focus-visible:ring-slate-300" +
      " dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700 dark:focus-visible:bg-slate-700 dark:focus-visible:ring-slate-700";

  //#endregion

  return (
    <button className={`${styles} ${className}`} onClick={handleClick}>
      {label}
      <AnimatePresence mode={"popLayout"} initial={false}>
        <motion.div
          key={selected ? "selected" : "unselected"}
          variants={transitionVariants}
          initial={"scaleOut"}
          animate={"scaleIn"}
          transition={transitions.spring}
        >
          {selected ? (
            <MdCheck className={"h-full w-5"} />
          ) : (
            <MdAdd className={"h-full w-5"} />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
