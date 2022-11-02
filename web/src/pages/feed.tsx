import { useQuery } from "@tanstack/react-query";

import ImageList from "../components/Layout/ImageList";
import { fetchPosts } from "../helpers/fetch";

export default function Feed() {
  //#region Hooks

  const { data: posts, isLoading: arePostsLoading } = useQuery(
    ["feed_posts"],
    fetchPosts
  );

  //#endregion

  return (
    <main className={"h-screen"}>
      <ImageList
        arePostsLoading={arePostsLoading}
        posts={posts}
        className={"px-2 pb-4 pt-16 sm:px-4 lg:px-8"}
      />
    </main>
  );
}
