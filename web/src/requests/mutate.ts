/*
 * Functions to mutate/change data on the API
 */
import { AuthSession } from "../types/auth.type";
import { CreatedPost } from "../types/post.type";
import { User } from "../types/user.type";
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
  return await doRequest<{ userId: string }>(
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

export async function confirmEmail(userId: string, token: string) {
  return await doRequest<{ message: string }>(
    "/api/user/confirmEmail",
    { userId, token },
    "PUT"
  );
}

export async function sendConfirmationEmail(email: string, userId: string) {
  return await doRequest("/api/user/sendConfirmationEmail", { email }, "POST");
}

export async function updateUser(image = "", userName = "") {
  return await doRequest<User>(
    "/api/user/update",
    {
      userId: getAuthSession().userId,
      image,
      userName,
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

export async function addPostToCollection(
  postId: string,
  collectionId: string
) {
  return await doRequest<{ collectionId: string }>(
    "/api/collection/addPost",
    {
      userId: getAuthSession().userId,
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
    "/api/collection/removePost",
    {
      userId: getAuthSession().userId,
      postId,
      collectionId,
    },
    "DELETE"
  );
}

export async function createCollection(collectionName: string) {
  return await doRequest<{ collectionId: string }>(
    "/api/collection/create",
    {
      userId: getAuthSession().userId,
      collectionName,
    },
    "POST"
  );
}

export async function deleteCollection(collectionId: string) {
  return await doRequest<{ collectionId: string }>(
    "/api/collection/delete",
    {
      userId: getAuthSession().userId,
      collectionId,
    },
    "DELETE"
  );
}

export async function likePost(postId: string) {
  return await doRequest<{ postId: string }>(
    "/api/post/like",
    {
      userId: getAuthSession().userId,
      postId,
    },
    "POST"
  );
}
export async function unlikePost(postId: string) {
  return await doRequest<{ postId: string }>(
    "/api/post/unlike",
    {
      userId: getAuthSession().userId,
      postId,
    },
    "DELETE"
  );
}
