import { validateRequest } from "@daydream/common";
import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";

interface Request extends NextApiRequest {
  body: {
    userId: string;
    postId: string;
    collectionId: string;
  };
}

// TODO: We should check somewhere that the collection belongs to the user. We don't want to allow users to remove posts from other users' collections.
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
    return res.status(400).json("Give me a post for the collection");
  }

  const postToAdd = await prisma.post.findFirst({
    where: {
      id: String(postId),
    },
  });

  if (!postToAdd) {
    return res.status(400).json("Invalid PostID");
  }

  const resStatus = await prisma.collection.update({
    where: {
      collectionAndUserId: {
        userId: userId.toString(),
        id: collectionId.toString(),
      },
    },
    data: {
      posts: {
        disconnect: { id: postToAdd.id },
      },
    },
  });

  res.status(200).json({ success: true });
}
