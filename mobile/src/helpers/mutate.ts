/*
 * Functions to mutate/change data on the API
 * same as web/src/helpers/mutate.ts
 */
import doRequest from "./request";
import { getAuthSession } from "../utils/storage";
import { AuthSession } from "../types/auth.type";

export async function login(email: string, password: string) {
  return await doRequest<AuthSession>(
    "https://project.up.railway.app/api/user/login",
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
    "https://project.up.railway.app/api/user/register",
    {
      userId: (await getAuthSession()).userId,
      name,
      email,
      password,
    },
    "POST"
  );
}

export async function createPost(prompt: string) {}
export async function likePost(postId: string) {}
export async function unlikePost(postId: string) {}
