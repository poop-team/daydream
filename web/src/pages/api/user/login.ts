import { compare } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";
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
    res.status(401).json({
      error: "Invalid login credentials.",
    });
    return;
  }

  const success = await compare(password, user.passwordHash);
  if (!success) {
    res.status(401).json({
      error: "Invalid login credentials.",
    });
    return;
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
