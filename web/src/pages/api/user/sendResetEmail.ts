//reset password for user provided email address and send email with reset link to user

import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../utils/db/client";
import { sendPasswordResetEmail } from "../../../utils/email";

interface Request extends NextApiRequest {
  body: {
    email: string;
  };
}

export default async function sendResetEmail(
  req: Request,
  res: NextApiResponse
) {
  const { email } = req.body;
  if (!email) {
    return res.status(422).json({ error: "Email is required" });
  }
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    // If the user does not exist, we don't want to let them know that the email address is not in our system,
    // so we just return a success message
    return res.status(200).json({ message: "Reset email sent" });
  }

  sendPasswordResetEmail(user.email, user.name, user.id)
    .then(() => {
      res.status(200).json({ message: "Reset email sent" });
    })
    .catch(() => {
      res.status(500).json({ error: "Error sending reset email" });
    });
}
