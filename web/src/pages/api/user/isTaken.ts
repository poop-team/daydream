import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";

export default function isTaken(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;

  if (username && typeof username !== "string") {
    return res.status(400).json({ error: "Invalid username" });
  }

  prisma.user
    .findFirst({
      where: {
        name: username as string,
      },
    })
    .then((user) => {
      if (user) {
        res.status(200).json({ isTaken: true });
      } else {
        res.status(200).json({ isTaken: false });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal database error" });
    });
}
