/**
 * Functions to Fetch data from the API
 */

import { Post } from "../types/post.type";
import { User } from "../types/user.type";
import { getAuthSession } from "../utils/storage";
import doRequest from "./request";

export async function searchPosts({
  search = "",
  userId = "",
  collectionId = "",
  limit = 16,
  cursorId = "", // cursorId
  recentOnly = false,
}) {
  const params = new URLSearchParams({
    userId: (await getAuthSession()).userId,
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

export async function getUser(userId = "", userName = "") {
  const params = new URLSearchParams({
    userId: (await getAuthSession()).userId,
    searchUserId: userId || (await getAuthSession()).userId,
    userName: userName,
  });

  return await doRequest<User>(
    `/api/user/get?${params.toString()}`,
    null,
    "GET"
  );
}

export async function authenticateUser() {
  return await doRequest<{ message: string }>(
    `/api/user/auth?userId=${(await getAuthSession()).userId}`,
    null,
    "GET"
  );
}
