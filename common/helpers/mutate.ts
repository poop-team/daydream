/*
 * Functions to mutate/change data on the API
 */
import { AuthSession } from "../types/auth.type";
import { CreatedPost } from "../types/post.type";
import { getAuthSession } from "../utils/storage";
import doRequest from "./request";

export async function login(email: string, password: string) {
  return await doRequest<AuthSession>(
    "/api/user/login",
    {
      userId: getAuthSession().userId,
      email,
      password,
    },
    "POST"
  );
}

export async function register(name: string, email: string, password: string) {
  await doRequest(
    "/api/user/register",
    {
      userId: getAuthSession().userId,
      name,
      email,
      password,
    },
    "POST"
  );
}

export async function createPost(prompt: string) {
  return await doRequest<CreatedPost>(
    "/api/post/create",
    {
      userId: getAuthSession().userId,
      prompt,
    },
    "POST"
  );
}

export async function likePost(postId: string) {}
export async function unlikePost(postId: string) {}
