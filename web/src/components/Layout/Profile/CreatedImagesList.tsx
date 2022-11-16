import { useInfiniteQuery } from "@tanstack/react-query";
import { useScroll } from "framer-motion";
import { useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";

import useDebounce from "../../../hooks/useDebounce";
import { searchPosts } from "../../../requests/fetch";
import ImageList from "../ImageList";

interface Props {
  userId?: string;
  searchValue: string;
}

export default function CreatedImagesList({ userId, searchValue }: Props) {
  //#region Hooks

  const { scrollYProgress } = useScroll();

  const debouncedSearchValue = useDebounce(searchValue, 250);

  const {
    data: infinitePostsData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["feed_posts", { search: debouncedSearchValue, userId }],
    queryFn: ({ pageParam = "" }) =>
      searchPosts({
        search: searchValue,
        limit: 24,
        cursorId: pageParam as string,
        userId,
        recentOnly: true,
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursorId,
    onError: (err: Error) => {
      toast.error(err.message);
    },
    enabled: !!userId,
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
  }, [hasNextPage, isFetchingNextPage, scrollYProgress]);

  //#endregion

  return (
    <ImageList
      arePostsLoading={isFetching && !isFetchingNextPage}
      areMorePostsLoading={isFetchingNextPage}
      posts={posts}
      className={"px-2 py-16 sm:px-4 md:pb-8 lg:px-8"}
    />
  );
}
