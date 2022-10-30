import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";

import CircularProgress from "../components/Feedback/CircularProgress";
import ImageCard from "../components/Surfaces/ImageCard";
import { transitions } from "../styles/motion-definitions";
import type { Post } from "../types/post";

//#region Fetch Functions

const fetchPosts = async () => {
  const res = await fetch("/api/Allposts");
  const data = (await res.json()) as { AllPostsOfAllUsers: Post[] };
  return data.AllPostsOfAllUsers;
};

//#endregion

//#region Variants

const container = {
  show: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const item = {
  hidden: { scale: 0.9, y: -16, opacity: 0 },
  show: { scale: 1, y: 0, opacity: 1 },
};

//#endregion

export default function Feed() {
  //#region Hooks
  const { data: posts, isLoading: arePostsLoading } = useQuery(
    ["feed_posts"],
    fetchPosts
  );

  console.log(posts);

  //#endregion

  return (
    <main className={"h-screen"}>
      {posts ? (
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
        <div className={"flex items-center justify-center pt-[35%] text-2xl"}>
          {arePostsLoading ? (
            <CircularProgress className={"scale-[200%]"} />
          ) : (
            <p>Nothing to display &#128542;</p>
          )}
        </div>
      )}
    </main>
  );
}
