import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";
import { validateJWT } from "../../../utils/jwt";
import { validateMethod } from "../../../utils/validation";

interface Request extends NextApiRequest {
  body: {
    userId: string;
    token: string;
  };
}

export default async function confirmEmail(req: Request, res: NextApiResponse) {
  if (!validateMethod("PUT", req, res)) return;

  const { userId, token } = req.body;

  if (!userId || !token || Array.isArray(userId) || Array.isArray(token)) {
    return res
      .status(400)
      .json({ error: "Passed params cannot be a string array or undefined" });
  }

  if (!(await validateJWT(userId, token))) {
    return res.status(400).json({ error: "Token is invalid" });
  }

  // verify that the user exists with the userID
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return res.status(400).json({ error: "User does not exist" });
  }

  if (user.emailVerified) {
    return res.status(201).json({ message: "Email is already verified" });
  }

  // If user does exist, then create a date object and add that user's emailVerified date
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailVerified: new Date(),
    },
  });

  return res.status(201).json({
    message: "Email verified! 🥳",
  });
}
