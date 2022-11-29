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

  prisma.post
    .findUnique({
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
            image: true,
          },
        },
        likes: true,
      },
    })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      return res.json(post);
    })
    .catch((e: Error) => {
      console.log(e.message);
      return res.status(500).json({ error: "Internal server error" });
    });
}
