import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GetCollection(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const prisma = new PrismaClient();
  const query = req.query;

  if (!query.CollectionID) {
    res.statusCode = 402;
    return res.json("No CollectionID provided");
  }

  const resData = await prisma.collection.findMany({
    where: {
        id: String(query.collectionId)
    },
    select: {posts: true}
  });
  //returns type resData: Post[]
  return res.json({resData});
}
