import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import { getServerAuthSession } from "../../server/common/get-server-auth-session";

export default async function createCollection(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerAuthSession({ req, res });

  if (!session) {
    res.statusCode = 401;
    res.json({ Error: "User not logged in." });
    return;
  }

  const prisma = new PrismaClient();
  const { postId } = req.query;

  if (!postId) {
    res.statusCode = 400;
    res.json("Give me post to like");
    return;
  }

  const postToLike = await prisma.post.findFirst({
    where: {
      id: String(postId),
    },
  });

  if (!postToLike) {
    res.statusCode = 400;
    res.json("give me a valid postId");
    return;
  }

  const like = await prisma.like.create({
    data: {
      userId: session.user?.id as string,
      postID: postId.toString(),
    },
  });

  res.json({ success: true });
}
