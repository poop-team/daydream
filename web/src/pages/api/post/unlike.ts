import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";
import { validateRequest } from "../../../utils/jwt";

interface Request extends NextApiRequest {
  body: {
    userId: string;
    postId: string;
  };
}

export default async function unlike(req: Request, res: NextApiResponse) {
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

  const postToUnlike = await prisma.post.findFirst({
    where: {
      id: String(postId),
    },
  });

  if (!postToUnlike) {
    return res.status(404).json({ error: "Post not found" });
  }

  prisma.like
    .deleteMany({
      where: {
        postID: postId,
        userId: userId,
      },
    })
    .then(() => {
      res.json({ postId });
    })
    .catch((err: Error) => {
      res.status(500).json({ error: err.message });
    });
}
