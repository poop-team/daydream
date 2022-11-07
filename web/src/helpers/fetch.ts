/**
 * Functions to Fetch data from the API
 */

import type { Post } from "../types/post.type";
import { getAuthSession } from "../utils/storage";
import doRequest from "./request";

export async function fetchPosts() {
  const res = await fetch("/api/post/all");
  const data = (await res.json()) as { AllPostsOfAllUsers: Post[] };
  return data.AllPostsOfAllUsers;
}

export async function fetchCollections(collectionId: string) {
  return await doRequest(
    "/api/collection/allForUser",
    {
      userId: getAuthSession().userId,
    },
    "GET"
  );
}
