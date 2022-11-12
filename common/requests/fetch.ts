/**
 * Functions to Fetch data from the API
 */

import { Post, User } from "../types";
import doRequest from "./request";

export async function searchPosts({
  search = "",
  userId = "",
  collectionId = "",
  limit = 16,
  cursorId = "", // cursorId
}) {
  const params = new URLSearchParams({
    userId,
    search,
    searchUserId: userId,
    collectionId,
    limit: limit.toString(),
    cursorId,
  });

  return await doRequest<{ posts: Post[]; nextCursorId: string }>(
    `/api/post/search?${params.toString()}`,
    null,
    "GET"
  );
}

export async function getUser(userId = "", searchUserId = "") {
  const params = new URLSearchParams({
    userId,
    searchUserId,
  });

  return await doRequest<User>(
    `/api/user/get?${params.toString()}`,
    null,
    "GET"
  );
}

export async function authenticateUser(userId: string) {
  return await doRequest<{ message: string }>(
    `/api/user/auth?userId=${userId}`,
    null,
    "GET"
  );
}
