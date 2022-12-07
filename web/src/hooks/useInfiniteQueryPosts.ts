import { useInfiniteQuery } from "@tanstack/react-query";
import { useScroll } from "framer-motion";
import { useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";

import { searchPosts } from "../requests/fetch";
import useDebounce from "./useDebounce";

interface Params {
  key: string;
  searchValue: string;
  userId?: string;
  collectionId?: string;
  recentOnly?: boolean;
  limit?: number;
  queryOptions?: {
    refetchOnMount?: boolean | "always";
    staleTime?: number;
    enabled?: boolean;
  };
}

export default function useInfiniteQueryPosts({
  key,
  searchValue,
  userId,
  collectionId,
  limit = 32,
  recentOnly,
  queryOptions,
}: Params) {
  const { scrollYProgress } = useScroll();

  const debouncedSearchValue = useDebounce(searchValue, 250);

  const {
    data: infinitePostsData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      key,
      { search: debouncedSearchValue, userId, collectionId, recentOnly },
    ],
    queryFn: ({ pageParam = "" }) =>
      searchPosts({
        search: searchValue,
        userId,
        collectionId,
        cursorId: pageParam as string,
        limit,
        recentOnly,
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursorId,
    onError: (err: Error) => {
      toast.error(err.message);
    },
    refetchOnMount: queryOptions?.refetchOnMount ?? true,
    staleTime: queryOptions?.staleTime ?? 1000 * 60 * 5,
    enabled: queryOptions?.enabled ?? true,
  });

  const posts = useMemo(() => {
    return infinitePostsData?.pages.flatMap((page) => page.posts) ?? [];
  }, [infinitePostsData]);

  useEffect(() => {
    return scrollYProgress.onChange((progress) => {
      if (progress > 0.8 && !isFetchingNextPage && hasNextPage) {
        void fetchNextPage();
      }
    });
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, scrollYProgress]);

  return {
    posts,
    isFetching,
    isFetchingNextPage,
  };
}
