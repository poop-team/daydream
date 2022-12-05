import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";
import { validateRequest } from "../../../utils/jwt";

export default async function get(req: NextApiRequest, res: NextApiResponse) {
  // Validate if the user has a valid JWT token
  if (!(await validateRequest(req))) {
    return res.status(401).json({ error: "User not logged in." });
  }

  const { userId, postId } = req.query;

  if (!postId) {
    return res
      .status(400)
      .json({ error: "You are missing the postId parameter" });
  }

  if (Array.isArray(userId) || Array.isArray(postId)) {
    return res.status(400).json({ error: "postId cannot be a string array" });
  }

  prisma.post
    .findUnique({
      where: {
        id: postId || undefined,
      },
      select: {
        id: true,
        dateCreated: true,
        prompt: true,
        imageURL: true,
        author: {
          select: {
            name: true,
            id: true,
            image: true,
          },
        },
        // Return the collections it is in
        collections: {
          where: {
            userId: userId, // Only return collections that the user owns (mainly to conserve bandwidth)
          },
          select: {
            id: true,
            name: true,
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
    })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      const { _count, likes, ...postWithoutCount } = post;
      return res.json({
        ...postWithoutCount,
        likeCount: _count.likes,
        isLiked: likes.length > 0,
      });
    })
    .catch((e: Error) => {
      console.error(e.message);
      return res.status(500).json({ error: "Internal server error" });
    });
}
