import { motion } from "framer-motion";

export default function Index() {
  return (
    <div
      className={
        "flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-background-darker"
      }
    >
      <motion.a
        href="https://www.youtube.com/watch?v=S5o9g22BdXw"
        whileHover={{ scale: 2 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={
          "absolute z-10 text-center text-3xl font-bold text-primary-light"
        }
      >
        💩
      </motion.a>
      <motion.h1
        drag
        whileDrag={{ cursor: "grabbing" }}
        className={
          "absolute z-10 cursor-grab rounded-3xl px-4 text-center text-3xl font-bold text-primary-light backdrop-blur-md"
        }
      >
        Nothing to see here.
      </motion.h1>
      <motion.div
        whileHover={{ scale: 1.1 }}
        animate={{
          opacity: [0, 1, 0, 1, 0],
          borderWidth: [0, 8, 0, 8, 0],
          height: ["3rem", "6rem", "3rem", "6rem", "3rem"],
          width: ["20rem", "24rem", "20rem", "24rem", "20rem"],
          transition: {
            duration: 1,
          },
        }}
        className={"rounded-full border-primary-light"}
      />
    </div>
  );
}
