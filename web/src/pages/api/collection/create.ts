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
    return res.status(400).json("No collection name specified in request body");
  }

  const collection = await prisma.collection.create({
    data: {
      userId: userId,
      name: collectionName,
    },
  });

  // TODO: Ideally we would return the entire collection object here and not just the ID
  res.json(collection);
}
