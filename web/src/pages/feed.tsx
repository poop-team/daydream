import { motion } from "framer-motion";

import ImageList from "../components/Layout/ImageList";
import useAuthRedirect from "../hooks/useAuthRedirect";
import useInfiniteQueryPosts from "../hooks/useInfiniteQueryPosts";
import { transitionVariants } from "../styles/motion-definitions";

interface Props {
  searchValue: string;
  feedSortValue: "featured" | "recent";
}

export default function Feed({ searchValue, feedSortValue }: Props) {
  //#region Hooks

  useAuthRedirect();

  const { posts, isFetching, isFetchingNextPage } = useInfiniteQueryPosts({
    key: "feed_posts",
    searchValue,
    limit: 32,
    recentOnly: feedSortValue === "recent",
    queryOptions: {
      refetchOnMount: "always", // Refetch on mount regardless of staleness (e.g. if the user navigates back to the feed from another route)
      staleTime: Infinity, // Never stale. Prevents unexpected layout shifts when the post order changes while navigating the feed
    },
  });

  //#endregion

  return (
    <motion.main
      className={"h-screen"}
      initial={"fadeOut"}
      animate={"fadeIn"}
      exit={"fadeOut"}
      custom={0.4}
      variants={transitionVariants}
    >
      <ImageList
        arePostsLoading={isFetching && !isFetchingNextPage}
        areMorePostsLoading={isFetchingNextPage}
        posts={posts}
        className={"px-4 py-16 md:pb-8 lg:px-8"}
      />
    </motion.main>
  );
}
