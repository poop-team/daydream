import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";
import sendConfirmationEmail from "../../../utils/email";
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
  // allow only emails vikkhuang89@gmail.com, abc123@robertboyd.dev
  if (
    email.trim() !== "vikkhuang89@gmail.com" ||
    email.trim() !== "abc123@robertboyd.dev"
  ) {
    res.status(400).json({ error: "Invalid email" });
    return;
  }

  if (!name.trim() || !email.trim() || !password) {
    return res.status(400).json({
      error: "Name, email and password are required",
    });
  }

  const passwordHash = await hash(password, 10);

  try {
    // create new user table via prisma
    const newUser = await prisma.user.create({
      data: {
        name: name.trim().toLowerCase(),
        email: email.trim(),
        passwordHash,
      },
    });

    await sendConfirmationEmail(newUser.email, newUser.name, newUser.id);

    return res.status(201).json({
      userId: newUser.id,
    });
  } catch (e) {
    return res.status(500).json({
      error: "Registration failed!",
    });
  }
}
