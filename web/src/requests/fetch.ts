/**
 * Functions to Fetch data from the API
 */

import type { Collection } from "../types/collection.type";
import { Post, PostWithCollections } from "../types/post.type";
import { User } from "../types/user.type";
import { getAuthSession } from "../utils/storage";
import doRequest from "./request";

export async function searchPosts({
  search = "",
  userId = "",
  collectionId = "",
  limit = 16,
  cursorId = "",
  recentOnly = false,
}) {
  const params = new URLSearchParams({
    userId: getAuthSession().userId,
    search,
    searchUserId: userId,
    collectionId,
    limit: limit.toString(),
    cursorId,
    recentOnly: recentOnly.toString(),
  });

  return await doRequest<{ posts: Post[]; nextCursorId: string }>(
    `/api/post/search?${params.toString()}`,
    null,
    "GET"
  );
}

// You can provide either a userId or a userName
export async function getUser({ userId = "", userName = "" }) {
  const params = new URLSearchParams({
    userId: getAuthSession().userId,
    searchUserId: userId,
    userName: userName,
  });

  return await doRequest<User>(
    `/api/user/get?${params.toString()}`,
    null,
    "GET"
  );
}

export async function getPostWithCollections(
  postId: string,
  collectionId = ""
) {
  const params = new URLSearchParams({
    userId: getAuthSession().userId,
    postId: postId,
    collectionId: collectionId,
  });

  return await doRequest<PostWithCollections>(
    `/api/post/get?${params.toString()}`,
    null,
    "GET"
  );
}

export async function getIsUsernameTaken(userName: string) {
  return (
    await doRequest<{ isTaken: boolean }>(
      `/api/user/isTaken?userName=${userName}`,
      null,
      "GET"
    )
  ).isTaken;
}

export async function authenticateUser() {
  return await doRequest<{ message: string }>(
    `/api/user/auth?userId=${getAuthSession().userId}`,
    null,
    "GET"
  );
}

export async function getCollections({ collectionId = "", userId = "" }) {
  const params = new URLSearchParams({
    userId: getAuthSession().userId,
    collectionId,
    searchUserId: userId,
  });

  return await doRequest<{ collections: Collection[] }>(
    `/api/collection/get?${params.toString()}`,
    null,
    "GET"
  );
}
