import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import { getServerAuthSession } from "../../server/common/get-server-auth-session";

export default async function createCollection(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const session = await getServerAuthSession({ req, res });

  // if (!session) {
  //   res.statusCode = 401;
  //   return res.json({ Error: "User not logged in." });
  // }

  const prisma = new PrismaClient();
  const query = req.query;

  if (!query.name) {
    res.statusCode = 400;
    return res.json("Give me a name for the collection");
  }

  const collection = await prisma.collection.create({
    data: {
      // userId: String(session.user?.id),
      userId: "cl9oql88i0009yb3z8wr3gzgy",
      name: query.name.toString(),
    },
  });

  res.json({ collectionId: collection.id });
}
