import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";
import { validateRequest } from "../../../utils/jwt";

interface Request extends NextApiRequest {
  body: {
    userId: string;
  };
}

export default async function get(req: Request, res: NextApiResponse) {
  // Validate if the user has a valid JWT token
  if (!(await validateRequest(req))) {
    return res.status(401).json({ error: "User not logged in." });
  }

  const { userId } = req.body;

  if (!userId) {
    return res
      .status(400)
      .json({ error: "You are missing the userId parameter" });
  }

  if (Array.isArray(userId)) {
    return res.status(400).json({ error: "userId cannot be a string array" });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  res.json({ user });
}
