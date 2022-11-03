import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import ImageList from "../components/Layout/ImageList";
import { fetchPosts } from "../helpers/fetch";

export default function Feed() {
  //#region Hooks
  const router = useRouter();

  const { data: posts, isLoading: arePostsLoading } = useQuery(
    ["feed_posts"],
    fetchPosts
  );

  //#endregion

  return (
    <main className={"h-screen"}>
      <ImageList arePostsLoading={arePostsLoading} posts={posts} />
    </main>
  );
}
