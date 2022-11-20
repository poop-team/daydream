// verify the JWT reset token and update user password
import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";
import { validateResetJWT } from "../../../utils/jwt";

interface Request extends NextApiRequest {
  body: {
    token: string;
    password: string;
  };
}

export default async function resetVerify(req: Request, res: NextApiResponse) {
  const { token, password } = req.body;
  if (!token) {
    return res.status(422).json({ error: "Token is required" });
  }
  if (!password) {
    return res.status(422).json({ error: "Password is required" });
  }
  //verify the JWT reset token
  const id = await validateResetJWT(token);
  if (!id) {
    return res.status(400).json({ error: "Invalid token" });
  }

  //hash the new password
  const passwordHash = await hash(password, 10);

  //update user password
  await prisma.user
    .update({
      where: {
        id,
      },
      data: {
        passwordHash,
      },
    })
    .catch((e) => {
      console.log(e);
      return res.status(500).json({ error: "Password reset failed" });
    });
  //ideally we should be using refresh tokens to invalidate the old JWT token and force the user to login again from all devices
  res.status(200).json({ message: "Password reset successful" });
}
