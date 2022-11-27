import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";
import { validateRequest } from "../../../utils/jwt";

interface Request extends NextApiRequest {
  body: {
    userId: string;
    collectionName: string;
  };
}

export default async function create(req: Request, res: NextApiResponse) {
  // Validate if the user has a valid JWT token
  if (!(await validateRequest(req))) {
    return res.status(401).json({ error: "You are not logged in" });
  }

  const { userId, collectionName } = req.body;

  if (!collectionName) {
    return res
      .status(400)
      .json({ error: "No collection name specified in request body" });
  }

  prisma.collection
    .create({
      data: {
        userId: userId,
        name: collectionName,
      },
    })
    .then((collection) => {
      res.json({ collectionId: collection.id });
    })
    .catch((err: Error) => {
      console.error(err.message);
      res.status(500).json({ error: "Internal database error" });
    });
}
