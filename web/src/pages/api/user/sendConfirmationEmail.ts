import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";
import { sendConfirmationEmail } from "../../../utils/email";
import { validateMethod } from "../../../utils/validation";

interface Request extends NextApiRequest {
  body: {
    userId: string;
    email: string;
  };
}

export default async function Register(req: Request, res: NextApiResponse) {
  if (!validateMethod("POST", req, res)) return;

  const { userId, email } = req.body;

  if (!userId && !email) {
    return res.status(400).json({
      error: "userId or email is required",
    });
  }

  const user = await prisma.user
    .findUnique({
      where: {
        id: userId || undefined,
        email: email || undefined,
      },
    })
    .catch((e: Error) => {
      console.error(e.message);
      return res.status(500).json({
        error: "Internal database error",
      });
    });

  if (!user) {
    return res.status(401).json({
      error: "Invalid user",
    });
  }

  sendConfirmationEmail(user.email, user.name, user.id)
    .then(() => {
      res.status(201).json({
        message: "Email verification link sent to your email",
      });
    })
    .catch(() => {
      res.status(500).json({
        error: "Could not send email verification link",
      });
    });
}
