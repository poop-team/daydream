import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";
import { validateRequest } from "../../../utils/jwt";

interface Request extends NextApiRequest {
  body: {
    userId: string;
    postId: string;
  };
}

export default async function like(req: Request, res: NextApiResponse) {
  // Validate if the user has a valid JWT token
  if (!(await validateRequest(req))) {
    return res.status(401).json({ error: "You are not logged in" });
  }

  const { userId, postId } = req.body;

  if (!postId) {
    return res
      .status(400)
      .json({ error: "No postId specified in request body" });
  }

  const postToLike = await prisma.post.findFirst({
    where: {
      id: String(postId),
    },
  });

  if (!postToLike) {
    return res.status(400).json({ error: "Post not found" });
  }

  prisma.like
    .create({
      data: {
        userId: userId,
        postID: postId,
      },
    })
    .then((like) => {
      res.json({ postId: like.postID });
    })
    .catch(() => {
      res.status(500).json({ error: "Internal database error" });
    });
}
