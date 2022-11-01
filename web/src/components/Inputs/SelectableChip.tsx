import { AnimatePresence, motion } from "framer-motion";
import { MdAdd, MdCheck } from "react-icons/md";

import { transitions, variants } from "../../styles/motion-definitions";

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
    "flex gap-2 px-4 py-1 rounded-full transition duration-200 ease-in-out";
  styles += selected
    ? " bg-indigo-700 text-slate-50"
    : " bg-slate-200 text-slate-900";

  //#endregion

  return (
    <button className={`${styles} ${className}`} onClick={handleClick}>
      {label}
      <AnimatePresence mode={"popLayout"} initial={false}>
        {selected ? (
          <motion.div
            key={"selected"}
            variants={variants}
            initial={"scaleOut"}
            animate={"scaleIn"}
            exit={"scaleOut"}
            transition={transitions.spring}
          >
            <MdCheck className={"inline-block h-full w-5"} />
          </motion.div>
        ) : (
          <motion.div
            key={"unselected"}
            variants={variants}
            initial={"scaleOut"}
            animate={"scaleIn"}
            exit={"scaleOut"}
            transition={transitions.spring}
          >
            <MdAdd className={"inline-block h-full w-5"} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
