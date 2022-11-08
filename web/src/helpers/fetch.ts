/**
 * Functions to Fetch data from the API
 */

import { Post } from "../types/post.type";
import { getAuthSession } from "../utils/storage";
import doRequest from "./request";

interface Params {
  search?: string;
  userId?: string | "me";
  collectionId?: string;
  limit?: number | string;
  cursorId?: string;
}

export async function searchPosts({
  search = "",
  userId = "",
  collectionId = "",
  limit = "",
  cursorId = "", // cursorId
}: Params) {
  const myUserId = getAuthSession().userId;
  return await doRequest<{ posts: Post[]; nextCursorId: string }>(
    `/api/post/search?userId=${myUserId}&search=${search}&searchUserId=${
      userId === "me" ? myUserId : userId
    }&collectionId=${collectionId}&limit=${limit}&cursorId=${cursorId}`,
    null,
    "GET"
  );
}
