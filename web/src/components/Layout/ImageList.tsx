import { AnimatePresence, motion } from "framer-motion";

import { transitions } from "../../styles/motion-definitions";
import type { Post } from "../../types/post.type";
import CircularProgress from "../Feedback/CircularProgress";
import ImageCard from "../Surfaces/ImageCard";

interface Props {
  posts?: Post[];
  arePostsLoading: boolean;
}

//#region Variants

const container = {
  show: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const item = {
  hidden: { scale: 0.9, y: -16, opacity: 0 },
  show: { scale: 1, y: 0, opacity: 1 },
};

//#endregion

export default function ImageList({ posts, arePostsLoading }: Props) {
  return posts ? (
    <motion.ol
      variants={container}
      initial="hidden"
      animate="show"
      transition={transitions.springStiff}
      className={
        "grid list-none grid-cols-fill-10 justify-items-center gap-2 px-2 pb-4 pt-16 sm:grid-cols-fill-20 sm:px-4 md:gap-4 lg:grid-cols-fill-30 lg:px-8 2xl:grid-cols-fill-40"
      }
    >
      <AnimatePresence mode={"popLayout"}>
        {posts.map((post) => (
          <motion.li
            key={post.id}
            variants={item}
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
        "absolute top-1/2 left-1/2 flex items-center justify-center text-2xl"
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
