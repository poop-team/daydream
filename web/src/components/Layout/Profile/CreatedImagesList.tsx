import useInfiniteQueryPosts from "../../../hooks/useInfiniteQueryPosts";
import ImageList from "../ImageList";

interface Props {
  userId?: string;
  searchValue: string;
  isProfileLoading: boolean;
}

export default function CreatedImagesList({
  userId,
  searchValue,
  isProfileLoading,
}: Props) {
  //#region Hooks

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
    <ImageList
      arePostsLoading={(isFetching && !isFetchingNextPage) || isProfileLoading}
      areMorePostsLoading={isFetchingNextPage}
      posts={posts}
    />
  );
}
