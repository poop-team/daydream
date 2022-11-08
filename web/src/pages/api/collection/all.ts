import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";

interface Request extends NextApiRequest {
  body: {
    userId: string;
  };
}

export default async function Get(req: Request, res: NextApiResponse) {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json("No userId provided");
  }

  const resData = await prisma.collection.findMany({
    where: {
      userId: userId,
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
