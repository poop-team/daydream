import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import { validateRequest } from "../../utils/jwt";

export default async function addPostToCollection(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!(await validateRequest(req))) {
    res.statusCode = 401;
    res.json({ Error: "User not logged in." });
    return;
  }

  const prisma = new PrismaClient();
  const { postId, collectionId } = req.query;

  if (!postId) {
    res.statusCode = 400;
    res.json("Give me a post for the collection");
    return;
  }

  // find the post
  const postToAdd = await prisma.post.findFirst({
    where: {
      id: postId.toString(),
    },
  });

  if (!postToAdd) {
    res.statusCode = 400;
    res.json("Invalid PostID");
    return;
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
