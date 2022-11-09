import { useInfiniteQuery } from "@tanstack/react-query";
import { useScroll } from "framer-motion";
import debounce from "lodash/debounce";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import ImageList from "../components/Layout/ImageList";
import { searchPosts } from "../helpers/fetch";

interface Props {
  searchValue: string;
}

export default function Feed({ searchValue }: Props) {
  //#region Hooks

  const { scrollYProgress } = useScroll();

  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

  const {
    data: infinitePostsData,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["feed_posts", { search: debouncedSearchValue }],
    queryFn: ({ pageParam = "" }) =>
      searchPosts({
        search: searchValue,
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

  // Debounce the search value (don't immediately update it after every keystroke)
  const debouncedSetSearchValue = useMemo(
    () => debounce(setDebouncedSearchValue, 250),
    []
  );

  useEffect(() => {
    debouncedSetSearchValue(searchValue);
  }, [searchValue]);

  useEffect(() => {
    return scrollYProgress.onChange((progress) => {
      if (progress > 0.6 && !isFetchingNextPage && hasNextPage) {
        void fetchNextPage();
      }
    });
  }, [hasNextPage, isFetchingNextPage]);

  // Cleanup and cancel subscriptions
  useEffect(() => {
    return () => {
      debouncedSetSearchValue.cancel();
    };
  }, []);

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
