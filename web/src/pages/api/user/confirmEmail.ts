import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";
import { validateJWT } from "../../../utils/jwt";
import { validateMethod } from "../../../utils/validation";

export default async function confirmEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!validateMethod("GET", req, res)) return;

  const { userId, token } = req.query;

  if (!userId || !token || Array.isArray(userId) || Array.isArray(token)) {
    return res
      .status(400)
      .json({ error: "Passed params cannot be a string array or undefined" });
  }

  if (!(await validateJWT(userId, token))) {
    return res.status(400).json({ error: "Token is invalid" });
  }

  // verify that the user exists with the userID
  const maybeUser = await prisma.user.findFirst({
    where: {
      id: userId,
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
