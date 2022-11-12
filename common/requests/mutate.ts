/*
 * Functions to mutate/change data on the API
 */
import { AuthSession, CreatedPost } from "../types";
import doRequest from "./request";

export async function login(userId: string, email: string, password: string) {
  return await doRequest<AuthSession>(
    "/api/user/login",
    {
      userId,
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
      name,
      email,
      password,
    },
    "POST"
  );
}

export async function createPost(userId: string, prompt: string) {
  return await doRequest<CreatedPost>(
    "/api/post/create",
    {
      userId: userId,
      prompt,
    },
    "POST"
  );
}

export async function likePost(postId: string) {}
export async function unlikePost(postId: string) {}
