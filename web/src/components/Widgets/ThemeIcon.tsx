import { AnimatePresence, motion } from "framer-motion";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const iconVariants = {
  hidden: {
    opacity: 0,
    scale: 0.6,
    transition: { duration: 0.1, ease: "easeOut" },
  },
  shown: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.1, ease: "easeOut" },
  },
};

interface Props {
  theme: "light" | "dark";
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
