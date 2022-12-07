import { motion, SVGMotionProps } from "framer-motion";

import { transitionVariants } from "../../styles/motion-definitions";

interface Props extends SVGMotionProps<SVGElement> {
  className?: string;
}

export default function CircularProgress({ className = "", ...rest }: Props) {
  return (
    <>
      <motion.svg
        initial={"fadeOut"}
        animate={"fadeIn"}
        exit={"fadeOut"}
        variants={transitionVariants}
        className={`h-5 w-5 ${className}`}
        {...rest}
      >
        <motion.circle
          cx={10}
          cy={10}
          r="8"
          stroke="currentColor"
          strokeWidth="3"
          fill="transparent"
          strokeDasharray={40}
          animate={{
            rotate: [0, 360, 0],
            strokeDashoffset: [80, 30, 80],
            transition: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 1.6,
            },
          }}
        />
      </motion.svg>
      <span className={"sr-only"}>Loading...</span>
    </>
  );
}
