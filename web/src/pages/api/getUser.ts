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
    res.json({ Error: "User not logged in." });
    return;
  }

  const prisma = new PrismaClient();
  const query = req.query;

  if (!query.userId) {
    res.statusCode = 400;
    res.json({ Error: "You are missing the userId parameter" });
    return;
  }

  if (Array.isArray(query.userId)) {
    res.statusCode = 400;
    res.json({ Error: "userId cannot be a string array" });
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: query.userId,
    },
  });

  res.json({ user });
}
