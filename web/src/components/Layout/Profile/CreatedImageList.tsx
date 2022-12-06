import { useRouter } from "next/router";
import { useState } from "react";

import useInfiniteQueryPosts from "../../../hooks/useInfiniteQueryPosts";
import ProfileSearchBar from "../../Inputs/ProfileSearchBar";
import ImageList from "../ImageList";

interface Props {
  userId?: string;
  isSelf: boolean;
  isProfileLoading: boolean;
}

export default function CreatedImageList({
  userId,
  isSelf,
  isProfileLoading,
}: Props) {
  //#region Hooks

  const router = useRouter();

  const [searchValue, setSearchValue] = useState("");

  const { posts, isFetching, isFetchingNextPage } = useInfiniteQueryPosts({
    key: "user_posts",
    searchValue,
    userId,
    recentOnly: true,
    queryOptions: {
      refetchOnMount: "always",
      enabled: !!userId,
    },
  });

  //#endregion

  return (
    <div>
      <ProfileSearchBar
        searchValue={searchValue}
        onSearchValueChange={setSearchValue}
        onAddButtonClick={() =>
          void router.push(`/create?prompt=${searchValue}`)
        }
      />
      <div className={"px-2 pb-16 pt-8 sm:px-4 sm:pt-12 md:pb-8 lg:px-8"}>
        <ImageList
          arePostsLoading={
            (isFetching && !isFetchingNextPage) || isProfileLoading
          }
          areMorePostsLoading={isFetchingNextPage}
          posts={posts}
        />
      </div>
    </div>
  );
}
