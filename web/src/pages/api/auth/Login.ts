import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

import { generateJWT } from "../../utils/jwt";
import { validateMethod, validateString } from "../../utils/utils";

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
    res.statusCode = 400;
    res.json({
      success: false,
      error: "Invalid login credentials.",
    });
    return;
  }

  const success = await compare(password, user.passwordHash);
  if (!success) {
    res.statusCode = 400;
    res.json({
      success: false,
      error: "Invalid login credentials.",
    });
    return;
  }

  try {
    const jwt = await generateJWT(email);
    res.json({
      success: true,
      jwt,
    });
  } catch (e) {
    res.json({
      success: false,
      error: String(e),
    });
  }
}
