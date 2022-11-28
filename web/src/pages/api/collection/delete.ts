import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";
import { validateRequest } from "../../../utils/jwt";

interface Request extends NextApiRequest {
  body: {
    userId: string;
    collectionId: string;
  };
}

export default async function deleteCollection(
  req: Request,
  res: NextApiResponse
) {
  // Validate if the user has a valid JWT token
  if (!(await validateRequest(req))) {
    return res.status(401).json({ error: "You are not logged in" });
  }

  const { userId, collectionId } = req.body;

  if (!collectionId) {
    return res
      .status(400)
      .json({ error: "No collectionId specified in request body" });
  }

  prisma.collection
    .delete({
      where: {
        collectionAndUserId: {
          userId: userId,
          id: collectionId,
        },
      },
    })
    .then((collection) => {
      res.status(200).json({ collectionId: collection.id });
    })
    .catch((err: Error) => {
      console.error(err.message);
      res.status(500).json({ error: "Internal database error" });
    });
}
