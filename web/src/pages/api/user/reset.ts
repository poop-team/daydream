//reset password for user provided email address and send email with reset link to user

import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";
import { generateJWTForPasswordReset } from "../../../utils/jwt";

interface Request extends NextApiRequest {
  body: {
    email: string;
  };
}

export default async function reset(req: Request, res: NextApiResponse) {
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
    console.log("User not found");
    // If the user does not exist, we don't want to let them know
    // that the email address is not in our system
    // so we just return a success message
    return res.status(200).json({ message: "Reset email sent" });
  }

  // Generate a Reset JWT token with a 20 min expiry time.
  //This token will be used to verify the user's identity when they click the reset link in their email
  const token = await generateJWTForPasswordReset(user.id);
  console.log(token);
  //create url for reset link
  //const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/user/resetVerify?token=${token}`;
  //send email with reset link to user
  // await sendResetEmail(resetUrl);

  res.status(200).json({ message: "Reset email sent" });
}
