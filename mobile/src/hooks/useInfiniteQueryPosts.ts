import { useInfiniteQuery } from "@tanstack/react-query";
import { searchPosts } from "../requests/fetch";
import { useEffect, useMemo } from "react";
// todo - add scroll check to see if we need to fetch more
// todo - refresh posts on refocus of app
// todo - add refresh on scroll up

/*
 * This hook is used to fetch posts from the API
 * returns an array of posts and a function to fetch more posts
 */
interface Params {
  key: string;
  searchValue: string;
  userId?: string;
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
  limit,
  recentOnly,
  queryOptions,
}: Params) {
  // FixMe - search bar debouncing needs to be done, seems like the value resets too quickly
  //const debouncedSearchValue = useDebounce(searchValue, 250);

  const {
    data: infinitePostsData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [key, { search: searchValue, userId }],
    queryFn: ({ pageParam = "" }) =>
      searchPosts({
        search: searchValue,
        userId,
        cursorId: pageParam as string,
        limit,
        recentOnly,
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursorId,
    onError: (err: Error) => {
      //toast.error(err.message);
      console.log(err);
    },
    refetchOnMount: queryOptions?.refetchOnMount ?? true,
    staleTime: queryOptions?.staleTime ?? 1000 * 60 * 5,
    enabled: queryOptions?.enabled ?? true,
  });

  const posts = useMemo(() => {
    return infinitePostsData?.pages.flatMap((page) => page.posts) ?? [];
  }, [infinitePostsData]);

  return {
    posts,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  };
}
