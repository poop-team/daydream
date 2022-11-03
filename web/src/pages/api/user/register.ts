import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

import { validateMethod, validateString } from "../../../utils/validation";

interface Request extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

export default async function Register(req: Request, res: NextApiResponse) {
  if (!validateMethod("POST", req, res)) return;

  const { email, password } = req.body;
  console.log(req.body);

  if (!validateString(email, "email is required", res)) return;
  if (!validateString(password, "password is required", res)) return;

  const passwordHash = await hash(password, 10);

  const prisma = new PrismaClient();

  try {
    await prisma.user.create({
      data: {
        email,
        passwordHash,
      },
    });
  } catch (e) {
    res.status(500).json({
      error: "Registration failed!",
    });
    return;
  }

  res.status(201);
}
