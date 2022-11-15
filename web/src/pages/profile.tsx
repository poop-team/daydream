import { useInfiniteQuery } from "@tanstack/react-query";
import { useScroll } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { MdAddCircle } from "react-icons/md";

import Button from "../components/Inputs/Button";
import LinkIconButton from "../components/Inputs/LinkIconButton";
import SearchBar from "../components/Inputs/SearchBar";
import ImageList from "../components/Layout/ImageList";
import useAuthRedirect from "../hooks/useAuthRedirect";
import useDebounce from "../hooks/useDebounce";
import { searchPosts } from "../requests/fetch";

interface Props {
  searchValue: string;
}

export default function Profile({ searchValue }: Props) {
  //#region Hooks

  useAuthRedirect();

  const { scrollYProgress } = useScroll();
  const [text, setText] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 250);

  const {
    data: infinitePostsData,
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
        recentOnly: true,
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
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, scrollYProgress]);

  //#endregion

  const userData = get()

  const userViews = 1;
  const userSaves = 1;
  const userName = "username";
  const userIcon = "https://avatars.githubusercontent.com/u/79925808?v=4";

  return (
    <>
      <div className="p-4" />
      <div className="container mx-auto">
        <div className="p-4" />
        <div className="flex flex-wrap items-center justify-center">
          <a href="#" className="relative block">
            <img
              className="custom-position h-24 w-24 rounded-full object-cover"
              src={userIcon}
              alt="name"
            />
          </a>
        </div>
        <div className="p-4" />
      </div>

      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-center">
          <div className="text-lg">@{userName}</div>
        </div>
        <div className="p-1" />
      </div>

      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="text-sm">{userViews} views</div>
          <div className="text-sm">{userSaves} saves</div>
        </div>
        <div className="p-2" />
      </div>

      <div className="container mx-auto">
        <div className="p-2"></div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="p-2">
            <section className="flex gap-4">
              <div className="flex flex-col items-center gap-2">
                {/*<Button disabled>Created</Button>*/}
                <Button variant="text">Created</Button>
              </div>
              {/*<div className="flex flex-col items-center gap-2">
                <Button>Collections</Button>
              </div>*/}
              <Link href="collections">
                <div className="flex flex-col items-center gap-2">
                  <Button>Collections</Button>
                </div>
              </Link>
            </section>
          </div>
        </div>
        <div className="p-2" />
      </div>

      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <SearchBar
            value={text}
            onValueChange={setText}
            className="w-11/12 max-w-xl sm:w-2/3"
          />
          <LinkIconButton href="/create" className="hidden text-base sm:block">
            <MdAddCircle className="h-8 w-full" />
          </LinkIconButton>
        </div>
        <div className="p-2" />
      </div>

      <ImageList
        arePostsLoading={isFetching && !isFetchingNextPage}
        areMorePostsLoading={isFetchingNextPage}
        posts={posts}
        className={"px-2 py-16 sm:px-4 md:pb-8 lg:px-8"}
      />
      {/*<div*/}
      {/*  className="grid grid-cols-fill-10 justify-items-center gap-2 py-4 px-2 sm:grid-cols-fill-20 sm:px-4 md:gap-4*/}
      {/*  lg:grid-cols-fill-30 lg:px-8 2xl:grid-cols-fill-40"*/}
      {/*>*/}
      {/*  {mockData.map((data) =>*/}
      {/*    [1, 2, 3, 4, 5, 6].map((i) => (*/}
      {/*      <ImageCard key={data.id + i} {...data} className="h-full w-full" />*/}
      {/*    ))*/}
      {/*  )}*/}
      {/*</div>*/}
    </>
  );
}
