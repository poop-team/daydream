import { AnimatePresence, motion } from "framer-motion";
import { MdDarkMode, MdLightMode } from "react-icons/md";

import { iconVariants } from "../../styles/motion-definitions";

interface Props {
  theme: string;
}

export default function ThemeIcon({ theme }: Props) {
  return (
    <AnimatePresence mode={"wait"} initial={false}>
      {theme === "light" ? (
        <motion.div
          key={"light"}
          initial={"hidden"}
          animate={"shown"}
          exit={"hidden"}
          variants={iconVariants}
        >
          <MdDarkMode />
        </motion.div>
      ) : (
        <motion.div
          key={"dark"}
          initial={"hidden"}
          animate={"shown"}
          exit={"hidden"}
          variants={iconVariants}
        >
          <MdLightMode />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
