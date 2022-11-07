import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";
import { validateRequest } from "../../../utils/jwt";

interface Request extends NextApiRequest {
  body: {
    userId: string;
    postId: string;
  };
}

export default async function createCollection(
  req: Request,
  res: NextApiResponse
) {
  // Validate if the user has a valid JWT token
  if (!(await validateRequest(req))) {
    return res.status(401).json({ error: "User not logged in." });
  }

  const { userId, postId } = req.body;

  if (!postId) {
    return res.status(400).json("Give me post to like");
  }

  const postToLike = await prisma.post.findFirst({
    where: {
      id: String(postId),
    },
  });

  if (!postToLike) {
    return res.status(400).json("give me a valid postId");
  }

  const like = await prisma.like.create({
    data: {
      userId: userId,
      postID: postId,
    },
  });

  res.json({ success: true });
}
