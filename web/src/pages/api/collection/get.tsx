import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";

interface Request extends NextApiRequest {
  body: {
    collectionId: string;
  };
}

export default async function Get(req: Request, res: NextApiResponse) {
  const { collectionId } = req.body;

  if (!collectionId) {
    return res.status(402).json("No collectionId provided");
  }

  const resData = await prisma.collection.findMany({
    where: {
      id: collectionId,
    },
    select: {
      posts: {
        orderBy: {
          dateCreated: "desc",
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
            },
          },
          likes: true,
        },
      },
    },
  });
  //returns type resData: Post[]
  res.status(200).json({ resData });
}
