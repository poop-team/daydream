/*
 * Functions to mutate/change data on the API
 * same as web/src/helpers/mutate.ts
 */
import doRequest from "./request";
import { getAuthSession } from "../utils/storage";
import { AuthSession } from "../types/auth.type";
import { CreatedPost } from "../types/post.type";
import { User } from "../types/user.type";

export async function login(email: string, password: string) {
  return await doRequest<AuthSession>(
    "https://daydream.wtf/api/user/login",
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
    "https://daydream.wtf/api/user/register",
    {
      userId: (await getAuthSession()).userId,
      name,
      email,
      password,
    },
    "POST"
  );
}

export async function updateUser(image = "", userName = "") {
  return await doRequest<User>(
    "https://daydream.wtf/api/user/update",
    {
      userId: (await getAuthSession()).userId,
      image,
      userName,
    },
    "POST"
  );
}

export async function createPost(prompt: string) {
  return await doRequest<CreatedPost>(
    "https://daydream.wtf/api/post/create",
    {
      userId: (await getAuthSession()).userId,
      prompt,
    },
    "POST"
  );
}

export async function addPostToCollection(
  postId: string,
  collectionId: string
) {
  return await doRequest<{ collectionId: string }>(
    "https://daydream.wtf/api/collection/addPost",
    {
      userId: (await getAuthSession()).userId,
      postId,
      collectionId,
    },
    "POST"
  );
}

export async function removePostFromCollection(
  postId: string,
  collectionId: string
) {
  return await doRequest<{ collectionId: string }>(
    "https://daydream.wtf/api/collection/removePost",
    {
      userId: (await getAuthSession()).userId,
      postId,
      collectionId,
    },
    "DELETE"
  );
}

export async function createCollection(collectionName: string) {
  return await doRequest<{ collectionId: string }>(
    "https://daydream.wtf/api/collection/create",
    {
      userId: (await getAuthSession()).userId,
      collectionName,
    },
    "POST"
  );
}

export async function likePost(postId: string) {
  return await doRequest<{ postId: string }>(
    "https://daydream.wtf/api/post/like",
    {
      userId: (await getAuthSession()).userId,
      postId,
    },
    "POST"
  );
}
export async function unlikePost(postId: string) {
  return await doRequest<{ postId: string }>(
    "https://daydream.wtf/api/post/unlike",
    {
      userId: (await getAuthSession()).userId,
      postId,
    },
    "DELETE"
  );
}
