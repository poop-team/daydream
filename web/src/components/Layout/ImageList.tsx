import { AnimatePresence, motion } from "framer-motion";

import {
  staggerContainerVariants,
  staggerItemVariants,
  transitions,
  transitionVariants,
} from "../../styles/motion-definitions";
import type { Post } from "../../types/post.type";
import { getAuthSession } from "../../utils/storage";
import CircularProgress from "../Feedback/CircularProgress";
import ImageCard from "../Surfaces/ImageCard";

interface Props {
  posts?: Post[];
  arePostsLoading: boolean;
  areMorePostsLoading?: boolean;
  className?: string;
}

export default function ImageList({
  posts,
  arePostsLoading,
  areMorePostsLoading,
  className = "",
}: Props) {
  return (
    <section className={"relative h-full w-full"}>
      <AnimatePresence mode={"popLayout"}>
        {posts?.length ? (
          <div key={"postList"}>
            <motion.ol
              variants={staggerContainerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              transition={transitions.springStiff}
              className={`grid list-none grid-cols-fill-10 justify-items-center gap-2 sm:grid-cols-fill-20 md:gap-4 
            lg:grid-cols-fill-30 2xl:grid-cols-fill-40 ${className}`}
            >
              <AnimatePresence mode={"popLayout"}>
                {posts.map((post, idx) => (
                  <motion.li
                    key={post.id}
                    layout
                    variants={staggerItemVariants}
                    exit={{ opacity: 0 }}
                    transition={transitions.springDamp}
                    className={"h-full w-full"}
                  >
                    <ImageCard
                      id={post.id}
                      src={post.imageURL}
                      prompt={post.prompt}
                      authorName={post.author.name}
                      authorAvatar={undefined}
                      likes={post.likes.length}
                      isLiked={
                        !!post.likes.find(
                          (like) => like.userId === getAuthSession().userId
                        )
                      }
                    />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ol>
            {areMorePostsLoading && (
              <motion.div
                variants={transitionVariants}
                initial={"fadeOut"}
                animate={"fadeIn"}
                className={"flex justify-center p-16"}
              >
                <CircularProgress className={"scale-[200%]"} />
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div
            key={"noPosts"}
            variants={transitionVariants}
            initial="fadeOut"
            animate="fadeIn"
            exit="fadeOut"
            className={
              "absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:text-2xl"
            }
          >
            {arePostsLoading ? (
              <motion.div
                variants={transitionVariants}
                initial={"fadeOut"}
                animate={"fadeIn"}
              >
                <CircularProgress className={"scale-[200%]"} />
              </motion.div>
            ) : (
              <motion.p
                variants={transitionVariants}
                initial={"fadeOut"}
                animate={"fadeIn"}
              >
                Nothing to display &#128542;
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
