import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../../server/db/client";
import { validateMethod } from "../../../../utils/validation";

export default async function confirmEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!validateMethod("GET", req, res)) return;

  const { userID } = req.query;

  if (Array.isArray(userID) || userID === undefined) {
    return res
      .status(400)
      .json({ Error: "Passed params cannot be a string array or undefined" });
  }

  // verify that the user exists with the userID
  const maybeUser: User | null = await prisma.user.findFirst({
    where: {
      id: userID,
    },
  });

  // if user does exist, then create a date object and add that user's emailVerified date
  if (maybeUser) {
    await prisma.user.update({
      where: {
        id: maybeUser.id,
      },
      data: {
        emailVerified: new Date(),
      },
    });

    return res.status(201).json({
      message: "Email confirmed!",
    });
  } else {
    return res.status(404).json({
      error: "User does not exist",
    });
  }
}
