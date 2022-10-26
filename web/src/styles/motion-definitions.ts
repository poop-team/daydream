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
      duration: 0.3,
      ease: "easeIn",
    },
  },
  fadeOut: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
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
