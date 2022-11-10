import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";
import { validateRequest } from "../../../utils/jwt";

export default async function get(req: NextApiRequest, res: NextApiResponse) {
  // Validate if the user has a valid JWT token
  if (!(await validateRequest(req))) {
    return res.status(401).json({ error: "User not logged in." });
  }

  const { userId, searchUserId } = req.query;

  if (!searchUserId) {
    return res.status(400).json("No searchUserId provided");
  }

  if (Array.isArray(searchUserId)) {
    return res.status(400).json({ error: "searchUserId cannot be an array" });
  }

  const getUser = await prisma.user.findUnique({
    where: {
      id: searchUserId,
    },
    select: {
      id: true,
      name: true,
      email: searchUserId === userId, // Only select this if the user is getting their own data
      emailVerified: searchUserId === userId, // Only select this if the user is getting their own data
      createdAt: true,
      updatedAt: true,
      image: true,
    },
  });

  const collectionsAndPosts = await prisma.collection.findMany({
    where: {
      userId: searchUserId,
    },
    select: {
      name: true,
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

  const result = {
    collections: collectionsAndPosts,
    userInfo: getUser,
  };
  res.status(200).json(result);
}
