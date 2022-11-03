import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";

// TODO: Remove this endpoint once /post/search is implemented
export default async function All(req: NextApiRequest, res: NextApiResponse) {
  //returns every single posts can be used for testing on explore page
  //If userId provided will return all posts from that user.

  const query = req.query;
  if (query.userID) {
    const AllPostsOfUsers = await prisma.post.findMany({
      where: {
        authorId: String(query.userID),
      },
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
    });
    //returns type AllPostsOfAllUsers: Post[]
    res.json({ AllPostsOfUsers });
  } else {
    const AllPostsOfAllUsers = await prisma.post.findMany({
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
    });
    //returns type AllPostsOfAllUsers: Post[]
    res.json({ AllPostsOfAllUsers });
  }
}
