import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";
import { validateRequest } from "../../../utils/jwt";

export default async function Get(req: NextApiRequest, res: NextApiResponse) {
  if (!(await validateRequest(req))) {
    return res.status(401).json({ error: "You are not logged in" });
  }

  const { searchUserId } = req.query;

  if (!searchUserId) {
    return res.status(400).json("No searchUserId provided");
  }

  const resData = await prisma.collection.findMany({
    where: {
      userId: searchUserId as string,
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
