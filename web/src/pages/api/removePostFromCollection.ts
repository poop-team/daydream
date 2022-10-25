import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import { getServerAuthSession } from "../../server/common/get-server-auth-session";

export default async function addPostToCollection(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   const session = await getServerAuthSession({ req, res });

  //   if (!session) {
  //     res.statusCode = 401;
  //     return res.json({ Error: "User not logged in." });
  //   }

  const prisma = new PrismaClient();
  const { postId, collectionId } = req.query;

  if (!postId) {
    res.statusCode = 400;
    return res.json("Give me a post for the collection");
  }

  // find the post
  const postToAdd = await prisma.post.findFirst({
    where: {
      id: String(postId),
    },
  });

  if (!postToAdd) {
    res.statusCode = 400;
    return res.json("Invalid PostID");
  }
  // get existing posts

  const resStatus = await prisma.collection.update({
    where: {
      id: String(collectionId),
    },
    data: {
      posts: {
        disconnect: { id: postToAdd.id },
      },
    },
  });

  return res.json({ sucess: true });
}
