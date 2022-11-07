import { AnimatePresence, motion } from "framer-motion";

import {
  staggerContainerVariants,
  staggerItemVariants,
  transitions,
} from "../../styles/motion-definitions";
import type { Post } from "../../types/post.type";
import CircularProgress from "../Feedback/CircularProgress";
import ImageCard from "../Surfaces/ImageCard";

interface Props {
  posts?: Post[];
  arePostsLoading: boolean;
  className?: string;
}

export default function ImageList({
  posts,
  arePostsLoading,
  className = "",
}: Props) {
  return posts?.length ? (
    <motion.ol
      variants={staggerContainerVariants}
      initial="hidden"
      animate="show"
      transition={transitions.springStiff}
      className={`grid list-none grid-cols-fill-10 justify-items-center gap-2 sm:grid-cols-fill-20 md:gap-4 lg:grid-cols-fill-30 2xl:grid-cols-fill-40 ${className}`}
    >
      <AnimatePresence mode={"popLayout"}>
        {posts.map((post) => (
          <motion.li
            key={post.id}
            layout
            variants={staggerItemVariants}
            exit={{ opacity: 0 }}
            transition={transitions.spring}
            className={"h-full w-full"}
          >
            <ImageCard
              src={post.imageURL}
              prompt={post.prompt}
              authorName={post.author.name}
              authorAvatar={undefined}
              likes={post.likes.length}
            />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ol>
  ) : (
    <div
      className={
        "absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:text-2xl"
      }
    >
      {arePostsLoading ? (
        <CircularProgress className={"scale-[200%]"} />
      ) : (
        <p>Nothing to display &#128542;</p>
      )}
    </div>
  );
}
