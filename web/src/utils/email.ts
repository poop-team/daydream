import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import {
  getConfirmEmailTemplate,
  getPasswordResetEmailTemplate,
} from "../data/email-templates";
import {
  generateJWTForEmailVerification,
  generateJWTForPasswordReset,
} from "./jwt";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://daydream.wtf";

export async function sendConfirmationEmail(
  email: string,
  userName: string,
  userId: string
) {
  const token = await generateJWTForEmailVerification(userId);

  // use nodemailer to send a verification email to the user's email address
  const transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> =
    nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

  const confirmEmailUrl = `${url}/auth/confirmEmail?userId=${userId}&token=${token}`;

  const template = getConfirmEmailTemplate(userName, confirmEmailUrl);
  return await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: template.subject,
    text: template.text,
    html: template.html,
  });
}

export async function sendPasswordResetEmail(
  email: string,
  userName: string,
  userId: string
) {
  const token = await generateJWTForPasswordReset(userId);

  const transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> =
    nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

  const resetUrl = `${url}/auth/reset?token=${token}`;

  const template = getPasswordResetEmailTemplate(userName, resetUrl);
  return await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: template.subject,
    text: template.text,
    html: template.html,
  });
}
