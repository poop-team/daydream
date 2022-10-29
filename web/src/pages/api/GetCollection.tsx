import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function createPost(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const prisma = new PrismaClient();
  const query = req.query;

  if (!query.CollectionID) {
    res.statusCode = 402;
    return res.json("No CollectionID provided");
  }

  const PostsInACollection = await prisma.collection.findMany({
    where: {
        id: String(query.collectionId)
    },
    select: {posts: true}
  })
  //returns type AllPostsOfAllUsers: Post[]
  return res.json({PostsInACollection});
}
