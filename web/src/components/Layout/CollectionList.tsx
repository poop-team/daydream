import { AnimatePresence, motion } from "framer-motion";

import {
  staggerContainerVariants,
  staggerItemVariants,
  transitions,
  transitionVariants,
} from "../../styles/motion-definitions";
import Collection from "../../types/collection.type";
import CircularProgress from "../Feedback/CircularProgress";
import CollectionCard from "../Surfaces/CollectionCard";

interface Props {
  collections?: Collection[];
  areCollectionsLoading: boolean;
  onCollectionClick?: (collection: Collection) => void;
  className?: string;
}

export default function CollectionList({
  collections,
  areCollectionsLoading,
  onCollectionClick = () => {},
  className = "",
}: Props) {
  return (
    <section className={"relative h-full w-full"}>
      <AnimatePresence mode={"popLayout"}>
        {collections?.length ? (
          <motion.ol
            key={"collectionList"}
            variants={staggerContainerVariants}
            initial={"hidden"}
            animate={"show"}
            exit={"hidden"}
            transition={transitions.springStiff}
            className={`grid list-none grid-cols-fill-10 justify-items-center gap-2 sm:grid-cols-fill-20 md:gap-4 
            lg:grid-cols-fill-30 2xl:grid-cols-fill-40 ${className}`}
          >
            <AnimatePresence mode={"popLayout"}>
              {collections.map((collection) => (
                <motion.li
                  key={collection.id}
                  layout
                  exit={{ opacity: 0 }}
                  variants={staggerItemVariants}
                  transition={transitions.springDamp}
                  onClick={() => onCollectionClick(collection)}
                  className={"h-full w-full"}
                >
                  <CollectionCard
                    posts={collection.posts}
                    name={collection.name}
                  />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ol>
        ) : (
          <motion.div
            key={"noCollections"}
            variants={transitionVariants}
            initial="fadeOut"
            animate="fadeIn"
            exit="fadeOut"
            className={
              "absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:text-2xl"
            }
          >
            {areCollectionsLoading ? (
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
                className={"whitespace-nowrap"}
              >
                {"No collections to show 😔"}
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
