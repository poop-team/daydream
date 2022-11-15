import { motion } from "framer-motion";

import {
  transitions,
  transitionVariants,
} from "../../styles/motion-definitions";

interface Props {
  loopDuration?: number;
  className?: string;
}

export default function LinearProgress({
  loopDuration = 1,
  className = "",
}: Props) {
  return (
    <motion.div
      key={"loading"}
      initial={"fadeOut"}
      animate={"fadeIn"}
      exit={"fadeOut"}
      variants={transitionVariants}
      transition={transitions.springStiff}
      className={`z-30 w-full ${className}`}
    >
      <motion.div
        animate={{ x: ["-120%", "240%"] }}
        transition={{
          duration: loopDuration,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
        className={"h-1 w-1/2 rounded-full bg-slate-100/90"}
      />
    </motion.div>
  );
}
