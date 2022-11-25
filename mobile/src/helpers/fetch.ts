/**
 * Functions to Fetch data from the API
 */

import { Post } from "../types/post.type";
import { User } from "../types/user.type";
import { getAuthSession } from "../utils/storage";
import doRequest from "./request";
import Collection from "../types/collection.type";

export async function searchPosts({
  search = "",
  userId = "",
  collectionId = "",
  limit = 16,
  cursorId = "",
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
    `https://daydream.wtf/api/post/search?${params.toString()}`,
    null,
    "GET"
  );
}

// You can provide either a userId or a userName
export async function getUser({ userId = "", userName = "" }) {
  const params = new URLSearchParams({
    userId: (await getAuthSession()).userId,
    searchUserId: userId || (await getAuthSession()).userId,
    userName: userName,
  });

  return await doRequest<User>(
    `https://daydream.wtf/api/user/get?${params.toString()}`,
    null,
    "GET"
  );
}

export async function authenticateUser() {
  return await doRequest<{ message: string }>(
    `https://daydream.wtf/api/user/auth?userId=${
      (
        await getAuthSession()
      ).userId
    }`,
    null,
    "GET"
  );
}

export async function getCollections({ collectionId = "", userId = "" }) {
  const params = new URLSearchParams({
    userId: (await getAuthSession()).userId,
    collectionId,
    searchUserId: userId,
  });

  return await doRequest<{ collections: Collection[] }>(
    `https://daydream.wtf/api/collection/get?${params.toString()}`,
    null,
    "GET"
  );
}
