import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";
import { validateRequest } from "../../../utils/jwt";

interface Request extends NextApiRequest {
  body: {
    postId: string;
  };
}

export default async function get(req: Request, res: NextApiResponse) {
  // Validate if the user has a valid JWT token
  if (!(await validateRequest(req))) {
    return res.status(401).json({ error: "User not logged in." });
  }

  const query = req.query;

  if (!query.postId) {
    return res
      .status(400)
      .json({ error: "You are missing the postId parameter" });
  }

  if (Array.isArray(query.postId)) {
    return res.status(400).json({ error: "postId cannot be a string array" });
  }

  const post = await prisma.post.findUnique({
    where: {
      id: query.postId,
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
        },
      },
      likes: true,
    },
  });

  if (!post) {
    return res.status(400).json({ error: "postId did not match any posts" });
  } else return res.json({ post });
}
