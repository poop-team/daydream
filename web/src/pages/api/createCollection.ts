import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import { getServerAuthSession } from "../../server/common/get-server-auth-session";

export default async function createCollection(
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

  if (!query.name) {
    res.statusCode = 400;
    res.json("Give me a name for the collection");
    return;
  }

  const collection = await prisma.collection.create({
    data: {
      userId: String(session.user?.id),
      name: query.name.toString(),
    },
  });

  res.json({ collectionId: collection.id });
}
