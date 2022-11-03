import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

import { generateJWT } from "../../../utils/jwt";
import { validateMethod, validateString } from "../../../utils/validation";

interface Request extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

export default async function Login(req: Request, res: NextApiResponse) {
  if (!validateMethod("POST", req, res)) return;

  const { email, password } = req.body;

  if (!validateString(email, "email is required", res)) return;
  if (!validateString(password, "password is required", res)) return;

  const prisma = new PrismaClient();
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
    const jwt = await generateJWT(email);
    res.json({
      jwt,
      userName: user.name,
      userAvatar: user.image,
    });
  } catch (e) {
    res.status(500).json({
      error: String(e),
    });
  }
}
