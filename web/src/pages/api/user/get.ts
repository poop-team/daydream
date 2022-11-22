import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";
import { validateRequest } from "../../../utils/jwt";

export default async function get(req: NextApiRequest, res: NextApiResponse) {
  // Validate if the user has a valid JWT token
  if (!(await validateRequest(req))) {
    return res.status(401).json({ error: "You are not logged in" });
  }

  const { userId, searchUserId, userName } = req.query;

  if (!searchUserId && !userName) {
    return res.status(400).json({ error: "No user id or name provided" });
  } else if (searchUserId && userName) {
    return res
      .status(400)
      .json({ error: "Provide either a user id or name but not both" });
  }

  if (Array.isArray(searchUserId) || Array.isArray(userName)) {
    return res
      .status(400)
      .json({ error: "The query params cannot be an array" });
  }

  prisma.user
    .findUnique({
      where: {
        id: searchUserId || undefined,
        name: userName || undefined,
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
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      prisma
        .$transaction([
          prisma.collection.count({
            where: {
              userId: user.id,
            },
          }),
          prisma.post.count({
            where: {
              authorId: user.id,
            },
          }),
        ])
        .then(([collectionCount, postCount]) => {
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
    })
    .catch((err: Error) => {
      console.error(err.message);
      return res.status(500).json({ error: "Internal database error" });
    });
}
