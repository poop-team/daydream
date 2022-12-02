import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";
import { validateMethod } from "../../../utils/validation";

interface Request extends NextApiRequest {
  body: {
    name: string;
    email: string;
    password: string;
  };
}

export default async function Register(req: Request, res: NextApiResponse) {
  if (!validateMethod("POST", req, res)) return;

  const { name, email, password } = req.body;

  if (!name.trim() || !email.trim() || !password) {
    return res.status(400).json({
      error: "Name, email and password are required",
    });
  }

  const passwordHash = await hash(password, 10);

  prisma.user
    .create({
      data: {
        name: name.trim().toLowerCase(),
        email: email.trim(),
        passwordHash,
      },
    })
    .then((user) => {
      return res.status(201).json({
        userId: user.id,
      });
    })
    .catch(() => {
      return res.status(500).json({
        error: "Registration failed!",
      });
    });
}
