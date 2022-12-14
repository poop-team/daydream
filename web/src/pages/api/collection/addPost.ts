import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../utils/db/client";
import { validateRequest } from "../../../utils/jwt";

interface Request extends NextApiRequest {
  body: {
    userId: string;
    postId: string;
    collectionId: string;
  };
}

export default async function addPost(req: Request, res: NextApiResponse) {
  // Validate if the user has a valid JWT token
  if (!(await validateRequest(req))) {
    return res.status(401).json({ error: "You are not logged in" });
  }

  const { userId, postId, collectionId } = req.body;

  if (!postId) {
    return res
      .status(400)
      .json({ error: "No postId specified in request body" });
  }

  // find the post
  const postToAdd = await prisma.post.findFirst({
    where: {
      id: postId,
    },
  });

  if (!postToAdd) {
    return res.status(404).json({ error: "Post not found" });
  }

  prisma.collection
    .update({
      where: {
        collectionAndUserId: {
          userId: userId,
          id: collectionId,
        },
      },
      data: {
        posts: {
          connect: { id: postToAdd.id },
        },
      },
    })
    .then((data) => {
      res.status(200).json({ collectionId: data.id });
    })
    .catch((err: Error) => {
      console.error(err.message);
      res.status(400).json({ error: "Internal database error" });
    });
}
