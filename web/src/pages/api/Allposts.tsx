import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Allposts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //returns every single posts can be used for testing on explore page
  //If userId provided will return all posts from that user.

  const prisma = new PrismaClient();
  const query = req.query;
  if (query.userID) {
    const AllPostsOfUsers = await prisma.post.findMany({
      where: {
        authorId: String(query.userID),
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
