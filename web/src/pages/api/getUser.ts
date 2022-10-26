import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import { getServerAuthSession } from "../../server/common/get-server-auth-session";

export default async function getUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerAuthSession({ req, res });

  if (!session) {
    res.statusCode = 401;
    return res.json({ Error: "User not logged in." });
  }

  const prisma = new PrismaClient();
  const query = req.query;

  if (!query.userId) {
    res.statusCode = 400;
    return res.json("You are missing the userId parameter");
  }

  if (Array.isArray(query.userId))
  {
    res.statusCode = 400;
    return res.json("userId cannot be a string array");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: query.userId,
    }
  });

  res.json({user});
}