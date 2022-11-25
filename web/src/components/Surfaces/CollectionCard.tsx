import { AnimatePresence, motion } from "framer-motion";
import { HTMLAttributes, useState } from "react";

import { transitions } from "../../styles/motion-definitions";
import { Post } from "../../types/post.type";
import LinearProgress from "../Feedback/LinearProgress";
import Card from "./Card";
import CustomImage from "./CustomImage";

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

interface Props extends HTMLAttributes<HTMLDivElement> {
  posts: Post[];
  isAdded?: boolean;
  isLoading?: boolean;
  name: string;
  className?: string;
}

export default function CollectionCard({
  posts,
  isAdded = false,
  isLoading = false,
  name,
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
      className={`group relative z-0 aspect-square h-fit cursor-pointer select-none  overflow-hidden p-6 
      shadow-none transition-all duration-200 ease-out ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      <AnimatePresence mode={"popLayout"} initial={false}>
        {posts.slice(0, 3).map((post, idx) => (
          <motion.div
            key={post.imageURL}
            custom={idx}
            initial={"initial"}
            animate={!isLoading && isHovered ? "hover" : "normal"}
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
            {idx === 0 && isAdded && (
              // Tag that indicates when a post is added to a collection
              <div
                className={
                  "absolute top-0 right-1/2 z-10 flex translate-x-1/2 items-center rounded-b-xl bg-indigo-900/90 px-4 text-xl text-slate-50 backdrop-blur-md"
                }
              >
                Added
              </div>
            )}
            <CustomImage
              src={post.imageURL}
              alt={name}
              fill
              priority
              sizes="(max-width: 600px) 40vw, (max-width: 1024px) 30vw, (max-width: 1536px) 22vw, 18vw"
              containerClassName={"aspect-square"}
              className={"object-cover"}
              draggable={false}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      <AnimatePresence>
        {isLoading && (
          <LinearProgress
            className={"absolute bottom-0 left-0"}
            loopDuration={0.7}
          />
        )}
      </AnimatePresence>
      {posts.length === 0 && (
        <div
          className={
            "absolute top-0 left-0 flex h-full w-full items-center justify-center bg-slate-300/80"
          }
        >
          <div className={"text-xl font-semibold text-slate-600"}>
            Nothing saved yet
          </div>
        </div>
      )}
      <div
        className={`absolute bottom-0 left-0 z-20 flex w-full justify-between bg-slate-800/70 p-1 text-slate-50 backdrop-blur-md`}
      >
        <div className={"basis-full text-center"}>
          <p className={"text-xl sm:text-2xl"}>{name}</p>
          <p className={"text-sm sm:text-base"}>{posts.length} saved</p>
        </div>
      </div>
    </Card>
  );
}
