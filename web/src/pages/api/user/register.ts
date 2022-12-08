import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../utils/db/client";
import { sendConfirmationEmail } from "../../../utils/email";
import { validateMethod } from "../../../utils/validation";

interface Request extends NextApiRequest {
  body: {
    name: string;
    email: string;
    password: string;
  };
}

const validEmailDomains = [
  "robertboyd.dev",
  "raciel.dev",
  "knights.ucf.edu",
  "faiz.info",
];

export default async function Register(req: Request, res: NextApiResponse) {
  if (!validateMethod("POST", req, res)) return;

  const { name, email, password } = req.body;

  if (!name.trim() || !email.trim() || !password) {
    return res.status(400).json({
      error: "Name, email and password are required",
    });
  }

  if (
    !validEmailDomains.some((domain) =>
      email.trim().toLowerCase().endsWith(domain)
    )
  ) {
    return res.status(400).json({
      error: "Access restricted, sorry 😢",
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
