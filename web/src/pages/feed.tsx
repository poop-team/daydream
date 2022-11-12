import { searchPosts } from "@daydream/common/requests";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useScroll } from "framer-motion";
import { useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";

import ImageList from "../components/Layout/ImageList";
import useDebounce from "../hooks/useDebounce";
import useRedirectUnauthenticated from "../hooks/useRedirectUnauthenticated";

interface Props {
  searchValue: string;
}

export default function Feed({ searchValue }: Props) {
  //#region Hooks

  useRedirectUnauthenticated();

  const { scrollYProgress } = useScroll();

  const debouncedSearchValue = useDebounce(searchValue, 250);

  const {
    data: infinitePostsData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["feed_posts", { search: debouncedSearchValue }],
    queryFn: async ({ pageParam = "" }) =>
      searchPosts({
        search: await Promise.resolve(""),
        limit: 32,
        cursorId: pageParam as string,
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursorId,
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const posts = useMemo(() => {
    return infinitePostsData?.pages.map((page) => page.posts).flat() ?? [];
  }, [infinitePostsData]);

  useEffect(() => {
    return scrollYProgress.onChange((progress) => {
      if (progress > 0.6 && !isFetchingNextPage && hasNextPage) {
        void fetchNextPage();
      }
    });
  }, [hasNextPage, isFetchingNextPage]);

  //#endregion

  return (
    <main className={"h-screen"}>
      <ImageList
        arePostsLoading={isFetching && !isFetchingNextPage}
        areMorePostsLoading={isFetchingNextPage}
        posts={posts}
        className={"px-2 py-16 sm:px-4 md:pb-8 lg:px-8"}
      />
    </main>
  );
}
