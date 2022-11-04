import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";
import { validateRequest } from "../../../utils/jwt";

interface Request extends NextApiRequest {
  body: {
    userId: string;
    postId: string;
    collectionId: string;
  };
}

// TODO: We should check somewhere that the collection belongs to the user. We don't want to allow users to add posts to other users' collections.
export default async function addPost(req: Request, res: NextApiResponse) {
  // Validate if the user has a valid JWT token
  if (!(await validateRequest(req))) {
    return res.status(401).json({ error: "User not logged in." });
  }

  const { userId, postId, collectionId } = req.body;

  if (!postId) {
    return res.status(400).json("No postId specified in request body");
  }

  // find the post
  const postToAdd = await prisma.post.findFirst({
    where: {
      id: postId,
    },
  });

  if (!postToAdd) {
    return res.status(400).json("Invalid postId");
  }
  // get existing posts

  const resStatus = await prisma.collection.update({
    where: {
      id: collectionId?.toString(),
    },
    data: {
      posts: {
        connect: { id: postToAdd.id },
      },
    },
  });

  res.json({ success: true });
}
