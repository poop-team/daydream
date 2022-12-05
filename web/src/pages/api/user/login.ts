import { compare } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";
import sendConfirmationEmail from "../../../utils/email";
import { generateJWT } from "../../../utils/jwt";
import { validateMethod } from "../../../utils/validation";

interface Request extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

export default async function Login(req: Request, res: NextApiResponse) {
  if (!validateMethod("POST", req, res)) return;

  const { email, password } = req.body;

  if (!email.trim() || !password.trim()) {
    return res.status(400).json({
      error: "Email and password are required",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(401).json({
      error: "Invalid login credentials",
    });
  }

  const success = await compare(password, user.passwordHash);
  if (!success) {
    return res.status(401).json({
      error: "Invalid login credentials",
    });
  }

  if (!user.emailVerified) {
    // Send another email verification email
    await sendConfirmationEmail(user.email, user.name, user.id);

    return res.status(401).json({
      error:
        "Email is not yet verified. Another verification email has been sent. Please check your inbox",
    });
  }

  try {
    const jwt = await generateJWT(user.id);
    res.json({
      jwt,
      userId: user.id,
      userName: user.name,
      userAvatar: user.image,
    });
  } catch (e) {
    res.status(500).json({
      error: String(e),
    });
  }
}
