import { AnimatePresence, motion } from "framer-motion";
import { HTMLAttributes, useState } from "react";

import { transitions } from "../../styles/motion-definitions";
import CustomImage from "../CustomImage";
import Card from "./Card";

interface Props extends HTMLAttributes<HTMLDivElement> {
  srcs: string[];
  name: string;
  postCount: number;
  className?: string;
}

const variants = {
  initial: {
    opacity: 0,
  },
  normal: (idx: number) => ({
    opacity: 1,
    translateY: idx === 0 ? "10%" : idx === 1 ? "4%" : "0%",
  }),
  hover: (idx: number) => ({
    opacity: 1,
    translateY: idx === 0 ? "20%" : idx === 1 ? "10%" : "2%",
  }),
};

export default function CollectionCard({
  srcs,
  name,
  postCount,
  className = "",
  ...rest
}: Props) {
  //#region Hooks

  const [isHovered, setIsHovered] = useState(false);

  //#endregion

  //#region Handlers

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  //#endregion

  return (
    <Card
      className={`group relative aspect-square h-fit cursor-pointer select-none overflow-hidden  p-6 shadow-none 
      transition-all duration-200 ease-out ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      <AnimatePresence mode={"popLayout"} initial={false}>
        {srcs.slice(0, 3).map((src, idx) => (
          <motion.div
            key={src}
            custom={idx}
            initial={"initial"}
            animate={isHovered ? "hover" : "normal"}
            exit={"initial"}
            variants={variants}
            transition={transitions.springStiff}
            style={{
              zIndex: idx === 0 ? 3 : idx === 1 ? 2 : 1,
              scale: idx === 0 ? 1 : idx === 1 ? 0.95 : 0.9,
            }}
            className={
              "absolute top-0 left-0 h-full w-full overflow-hidden rounded-2xl"
            }
          >
            <CustomImage
              src={src}
              alt={name}
              fill
              priority
              sizes="(max-width: 600px) 40vw, (max-width: 1024px) 30vw, (max-width: 1536px) 22vw, 18vw"
              containerClassName={"aspect-square"}
              className={"object-cover"}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="absolute bottom-0 left-0 z-20 flex w-full justify-between bg-slate-800/70 p-2 text-slate-50 backdrop-blur-md">
        <div className={"basis-full"}>
          <p className="text-center text-xl">{name}</p>
          <p className="text-center">{postCount} saved</p>
        </div>
      </div>
    </Card>
  );
}
