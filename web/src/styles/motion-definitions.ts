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
  easeOut: {
    type: "tween",
    ease: "easeOut",
    duration: 0.2,
  },
};

export const variants = {
  fadeIn: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  fadeOut: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
  growIn: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  growOut: {
    scale: 0.85,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
  scaleIn: {
    scale: 1,
    opacity: 1,
  },
  scaleOut: {
    scale: 0,
    opacity: 0,
  },
};

export const navVariants = {
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

export const staggerContainerVariants = {
  show: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

export const staggerItemVariants = {
  hidden: { scale: 0.9, y: -16, opacity: 0 },
  show: { scale: 1, y: 0, opacity: 1 },
};
