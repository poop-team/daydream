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
    searchUserId: userId,
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
    Array.isArray(collectionId) ||
    Array.isArray(limit) ||
    Array.isArray(cursorId)
  ) {
    return res
      .status(400)
      .json({ Error: "Passed params cannot be a string array" });
  }

  let posts;
  if (collectionId) {
    const searchedPosts = await prisma.collection.findUnique({
      where: {
        id: collectionId,
      },
      select: {
        posts: {
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
                id: true,
              },
            },
            likes: true,
          },
        },
      },
    });

    if (searchedPosts?.posts) {
      posts = searchedPosts.posts.filter((post: { prompt: string }) =>
        post.prompt.toLowerCase().includes(search.toLowerCase())
      );
    }
  } else {
    posts = await prisma.post.findMany({
      where: {
        authorId: userId || undefined, // Leave undefined if no userId is passed
        prompt: {
          // Performs a case-insensitive search for prompts that contain the search string
          contains: search,
          mode: "insensitive",
        },
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
            id: true,
          },
        },
        likes: true,
      },
    });
  }

  res.json({
    posts: posts ?? [],
    nextCursorId:
      posts && posts?.length > 0 ? posts[posts.length - 1].id : null,
  });
}
