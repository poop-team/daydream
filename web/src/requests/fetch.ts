/**
 * Functions to Fetch data from the API
 */

import Collection from "../types/collection.type";
import { Post } from "../types/post.type";
import { User } from "../types/user.type";
import { getAuthSession } from "../utils/storage";
import doRequest from "./request";

export async function searchPosts({
  search = "",
  userId = "",
  collectionId = "",
  limit = 16,
  cursorId = "",
}) {
  const params = new URLSearchParams({
    userId: getAuthSession().userId,
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

export async function getUser(userId = getAuthSession().userId) {
  const params = new URLSearchParams({
    userId: getAuthSession().userId,
    searchUserId: userId,
  });

  return await doRequest<User>(
    `/api/user/get?${params.toString()}`,
    null,
    "GET"
  );
}

export async function authenticateUser() {
  return await doRequest<{ message: string }>(
    `/api/user/auth?userId=${getAuthSession().userId}`,
    null,
    "GET"
  );
}

export async function getCollection({ collectionId = "", userId = "" }) {
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
