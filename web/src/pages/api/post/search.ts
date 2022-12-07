import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import { validateRequest } from "../../../utils/jwt";

export default async function search(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Validate if the user has a valid JWT token
  if (!(await validateRequest(req))) {
    return res.status(401).json({ error: "You are not logged in" });
  }

  const {
    search: unsanitizedSearch,
    userId,
    searchUserId,
    collectionId,
    limit,
    cursorId,
    recentOnly, // Order by most recent only
  } = req.query;
  const search = unsanitizedSearch?.toString().trim() ?? "";

  const prisma = new PrismaClient();

  if (
    Array.isArray(search) ||
    Array.isArray(userId) ||
    Array.isArray(searchUserId) ||
    Array.isArray(collectionId) ||
    Array.isArray(limit) ||
    Array.isArray(cursorId) ||
    Array.isArray(recentOnly)
  ) {
    return res
      .status(400)
      .json({ Error: "Passed params cannot be a string array" });
  }

  const posts = await prisma.post.findMany({
    where: {
      authorId: searchUserId || undefined, // Leave undefined if no searchUserId is passed
      prompt: {
        // Performs a case-insensitive search for prompts that contain the search string
        contains: search,
        mode: "insensitive",
      },
      // If a collectionId is passed, only return posts that are in that collection
      collections: collectionId
        ? {
            some: {
              id: collectionId,
            },
          }
        : undefined,
    },
    take: limit ? parseInt(limit.toString()) : undefined,
    skip: cursorId ? 1 : 0,
    cursor: cursorId ? { id: cursorId.toString() } : undefined,
    orderBy:
      recentOnly === "true"
        ? { dateCreated: "desc" }
        : [
            {
              likes: {
                _count: "desc",
              },
            },
            { dateCreated: "desc" },
          ],
    select: {
      id: true,
      dateCreated: true,
      prompt: true,
      imageURL: true,
      author: {
        select: {
          name: true,
          image: true,
          id: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
      // Get the current user's like status for each post
      likes: {
        where: {
          userId: userId,
        },
      },
    },
  });

  res.json({
    posts:
      posts.map(({ _count, likes, ...post }) => ({
        ...post,
        likeCount: _count.likes,
        isLiked: likes.length > 0,
      })) ?? [],
    nextCursorId:
      posts && posts?.length > 0 ? posts[posts.length - 1].id : null,
  });
}
