/**
 * Functions to Fetch data from the API
 */

import { Post } from "../types/post";

export async function fetchPosts() {
  const res = await fetch("/api/Allposts");
  const data = (await res.json()) as { AllPostsOfAllUsers: Post[] };
  return data.AllPostsOfAllUsers;
}
