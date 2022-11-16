import { useState } from "react";

import useInfiniteQueryPosts from "../../../hooks/useInfiniteQueryPosts";
import ProfileSearchBar from "../../Inputs/ProfileSearchBar";
import ImageList from "../ImageList";

interface Props {
  userId?: string;
  isProfileLoading: boolean;
}

export default function CreatedImageList({ userId, isProfileLoading }: Props) {
  //#region Hooks

  const [searchValue, setSearchValue] = useState("");

  const { posts, isFetching, isFetchingNextPage } = useInfiniteQueryPosts({
    searchValue,
    userId,
    limit: 24,
    recentOnly: true,
    queryOptions: {
      enabled: !!userId,
    },
  });

  //#endregion

  return (
    <div>
      <ProfileSearchBar
        searchValue={searchValue}
        onSearchValueChange={setSearchValue}
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
