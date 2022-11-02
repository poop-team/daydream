/*
 * Functions to mutate/change data on the API
 */
import { CreatedPost } from "../types/post.type";

export async function createPost(prompt: string) {
  const res = await fetch(`/api/createPost?prompt=${prompt}`);
  return (await res.json()) as CreatedPost;
}
export async function likePost(postId: string) {}
export async function unlikePost(postId: string) {}
