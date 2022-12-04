import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import { prisma } from "../../../server/db/client";
import { generateJWTForEmailVerification } from "../../../utils/jwt";
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

  try {
    // create new user table via prisma
    const newUser = await prisma.user.create({
      data: {
        name: name.trim().toLowerCase(),
        email: email.trim(),
        passwordHash,
      },
    });

    const jwt = await generateJWTForEmailVerification(newUser.id);

    // use nodemailer to send a verification email to the user's email address
    const transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> =
      nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

    const url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://daydream.wtf";
    const confirmEmailAPIRoute = `${url}/api/user/confirmEmail?userId=${newUser.id}&token=${jwt}`;

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      text:
        "Please verify your email with " +
        confirmEmailAPIRoute +
        " | Sent from:\nThe Team at Daydream",
      html: `<div>Please verify your email with ${confirmEmailAPIRoute}</div><p>Sent from:\nThe Team at Daydream</p>`,
    });
  } catch (e) {
    return res.status(500).json({
      error: "Registration failed!",
    });
  }

  return res.status(201).json({
    message:
      "Registration successful! Email verification link sent to your email. Please verify first to log in.",
  });
}
