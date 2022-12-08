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

export default async function addPostToCollection(
  req: Request,
  res: NextApiResponse
) {
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

  const postToAdd = await prisma.post.findFirst({
    where: {
      id: String(postId),
    },
  });

  if (!postToAdd) {
    return res.status(404).json({ error: "Post not found" });
  }

  const resStatus = await prisma.collection.update({
    where: {
      collectionAndUserId: {
        userId: userId,
        id: collectionId,
      },
    },
    data: {
      posts: {
        disconnect: { id: postToAdd.id },
      },
    },
  });

  res.status(200).json({ collectionId: resStatus.id });
}
