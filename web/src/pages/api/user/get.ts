import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";
import { validateRequest } from "../../../utils/jwt";

export default async function get(req: NextApiRequest, res: NextApiResponse) {
  // Validate if the user has a valid JWT token
  if (!(await validateRequest(req))) {
    return res.status(401).json({ error: "User not logged in." });
  }

  const { searchUserId } = req.query;

  if (!searchUserId) {
    return res
      .status(400)
      .json({ error: "You are missing the userId parameter" });
  }

  if (Array.isArray(searchUserId)) {
    return res.status(400).json({ error: "userId cannot be a string array" });
  }

  prisma.user
    .findUnique({
      where: {
        id: searchUserId,
      },
      select: {
        id: true,
        name: true,
        image: true,
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    })
    .catch((e: Error) => {
      console.error(e.message);
      res.status(500).json({ error: "Internal database error" });
    });
}
