import ImageList from "../components/Layout/ImageList";
import useAuthRedirect from "../hooks/useAuthRedirect";
import useInfiniteQueryPosts from "../hooks/useInfiniteQueryPosts";

interface Props {
  searchValue: string;
}

export default function Feed({ searchValue }: Props) {
  //#region Hooks

  useAuthRedirect();

  const { posts, isFetching, isFetchingNextPage } = useInfiniteQueryPosts({
    key: "feed_posts",
    searchValue,
    limit: 32,
    queryOptions: {
      refetchOnMount: "always", // Refetch on mount regardless of staleness (e.g. if the user navigates back to the feed from another route)
      staleTime: Infinity, // Never stale. Prevents unexpected layout shifts when the post order changes while navigating the feed
    },
  });

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
