import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";
import { validateRequest } from "../../../utils/jwt";

export default async function get(req: NextApiRequest, res: NextApiResponse) {
  // Validate if the user has a valid JWT token
  if (!(await validateRequest(req))) {
    return res.status(401).json({ error: "You are not logged in" });
  }

  const { userId, searchUserId } = req.query;

  if (!searchUserId) {
    return res.status(400).json("No searchUserId provided");
  }

  if (Array.isArray(searchUserId)) {
    return res.status(400).json({ error: "searchUserId cannot be an array" });
  }

  prisma
    .$transaction([
      prisma.user.findUnique({
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
      }),
      prisma.collection.count({
        where: {
          userId: searchUserId,
        },
      }),
      prisma.post.count({
        where: {
          authorId: searchUserId,
        },
      }),
    ])
    .then(([user, collectionCount, postCount]) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({
        ...user,
        collectionCount: collectionCount,
        postCount: postCount,
      });
    })
    .catch((err: Error) => {
      console.error(err.message);
      return res.status(500).json({ error: "Internal database error" });
    });
}
