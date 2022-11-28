/*
  Framer Motion Animations, Transitions, and Variants definitions
 */

export const transitions = {
  spring: {
    type: "spring",
    damping: 20,
    stiffness: 300,
  },
  springStiff: {
    type: "spring",
    damping: 30,
    stiffness: 500,
  },
  springStiffer: {
    type: "spring",
    damping: 40,
    stiffness: 700,
  },
  springDamp: {
    type: "spring",
    damping: 30,
    stiffness: 300,
  },
  easeOut: {
    type: "tween",
    ease: "easeOut",
    duration: 0.2,
  },
};

export const transitionVariants = {
  fadeIn: (delay = 0.2) => ({
    opacity: 1,
    transition: {
      duration: delay,
      ease: "easeOut",
    },
  }),
  fadeOut: (delay = 0.2) => ({
    opacity: 0,
    transition: {
      duration: delay,
      ease: "easeIn",
    },
  }),
  growIn: (delay = 0.2) => ({
    scale: 1,
    opacity: 1,
    transition: {
      duration: delay,
      ease: "easeOut",
    },
  }),
  growOut: (delay = 0.2) => ({
    scale: 0.9,
    opacity: 0,
    transition: {
      duration: delay,
      ease: "easeIn",
    },
  }),
  scaleIn: {
    scale: 1,
    opacity: 1,
  },
  scaleOut: {
    scale: 0,
    opacity: 0,
  },
};

export const positionVariants = {
  initialLeft: {
    x: -64,
    opacity: 0,
  },
  initialRight: {
    x: 64,
    opacity: 0,
  },
  initialTop: {
    y: -64,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
  },
};

export const iconVariants = {
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

export const staggerContainerVariants = {
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export const staggerItemVariants = {
  hidden: { scale: 0.9, y: -12, opacity: 0 },
  show: { scale: 1, y: 0, opacity: 1 },
};
