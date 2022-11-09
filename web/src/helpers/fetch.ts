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
}) {
  return await doRequest<{ posts: Post[]; nextCursorId: string }>(
    `/api/post/search?userId=${
      getAuthSession().userId
    }&search=${search}&searchUserId=${userId}&collectionId=${collectionId}&limit=${limit}&cursorId=${cursorId}`,
    null,
    "GET"
  );
}

export async function getUser(userId = "") {
  const currentUserId = getAuthSession().userId;
  return await doRequest<User>(
    `/api/user/get?userId=${currentUserId}&searchUserId=${
      userId || currentUserId
    }`,
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
