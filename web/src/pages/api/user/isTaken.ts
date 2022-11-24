import { NextApiRequest, NextApiResponse } from "next";
import { e } from "vitest/dist/index-40e0cb97";

import { prisma } from "../../../server/db/client";

// eslint-disable-next-line prettier/prettier
export default async function isTaken(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { username } = req.query;

    const user = await prisma.user.findFirst({
      where: {
        name: username as string,
      },
    });
    if (!user) {
      return res.status(400).json("Username taken");
    } else {
      res.status(200).json("Username free");
    }
  } catch (err) {
    res.status(500).json(err);
  }
}
