/*
  Framer Motion Animations, Transitions, and Variants definitions
 */

export const transitions = {
  spring: {
    type: "spring",
    damping: 20,
    stiffness: 100,
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
};
