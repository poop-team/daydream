/*
 * Functions to mutate/change data on the API
 */
import { AuthSession, CreatedPost } from "../types";
import { getAuthSession } from "../utils";
import doRequest from "./request";

export async function login(email: string, password: string) {
  return await doRequest<AuthSession>(
    "/api/user/login",
    {
      userId: (await getAuthSession()).userId,
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
      userId: (await getAuthSession()).userId,
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
      userId: (await getAuthSession()).userId,
      prompt,
    },
    "POST"
  );
}

export async function likePost(postId: string) {}
export async function unlikePost(postId: string) {}
