import { AnimatePresence, motion } from "framer-motion";
import { MdDarkMode, MdLightMode } from "react-icons/md";

import { transitions } from "../../styles/motion-definitions";

interface Props {
  theme: "light" | "dark";
}

export default function ThemeIcon({ theme }: Props) {
  return (
    <AnimatePresence mode={"wait"} initial={false}>
      {theme === "light" ? (
        <motion.div
          key={"light"}
          initial={{
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.5,
          }}
          transition={transitions.springStiff}
        >
          <MdDarkMode />
        </motion.div>
      ) : (
        <motion.div
          key={"dark"}
          initial={{
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.5,
          }}
          transition={transitions.springStiff}
        >
          <MdLightMode />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
