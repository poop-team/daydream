import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";

import ImageCard from "../components/Surfaces/ImageCard";
import { transitions } from "../styles/motion-definitions";

const fetchMockData = () => [
  {
    id: 1,
    src: "/images/placeholder.png",
    prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    likes: 69,
    authorName: "John Doe",
    authorAvatar: "/images/placeholder.png",
  },
  {
    id: 2,
    src: "/images/placeholder.png",
    prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.".repeat(
      100
    ),
    likes: 420,
    authorName: "Elon Musk",
    authorAvatar: "",
  },
  {
    id: 3,
    src: "/images/placeholder.png",
    prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    likes: 3697,
    authorName: "Very Long Naaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaame",
    authorAvatar: "/images/placeholder.png",
  },
];

//#region Variants

const container = {
  show: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const item = {
  hidden: { scale: 0.9, y: -24, opacity: 0 },
  show: { scale: 1, y: 0, opacity: 1 },
};

//#endregion

export default function Feed() {
  //#region Hooks

  const { data: posts, isLoading: arePostsLoading } = useQuery(
    ["feed_posts"],
    fetchMockData
  );

  //#endregion

  return (
    <main>
      {posts ? (
        <motion.ol
          variants={container}
          initial="hidden"
          animate="show"
          transition={transitions.springStiff}
          className={
            "grid list-none grid-cols-fill-10 justify-items-center gap-2 py-4 px-2 sm:grid-cols-fill-20 sm:px-4 md:gap-4 lg:grid-cols-fill-30 lg:px-8 2xl:grid-cols-fill-40"
          }
        >
          <AnimatePresence mode={"popLayout"}>
            {posts.map((data) =>
              [1, 2, 3, 4, 5, 6].map((i) => (
                <motion.li
                  key={data.id + i}
                  variants={item}
                  exit={{ opacity: 0 }}
                  transition={transitions.spring}
                  className={"h-full w-full"}
                >
                  <ImageCard {...data} />
                </motion.li>
              ))
            )}
          </AnimatePresence>
        </motion.ol>
      ) : (
        <div className={"flex h-full w-full items-center justify-center"}>
          {arePostsLoading ? <p>Loading...</p> : <p>Nothing to display</p>}
        </div>
      )}
    </main>
  );
}
