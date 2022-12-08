import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../utils/db/client";
import { uploadImage } from "../../../utils/image";
import { validateRequest } from "../../../utils/jwt";

interface Request extends NextApiRequest {
  body: {
    userId: string;
    image: string; // base64
    userName: string;
  };
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export default async function update(req: Request, res: NextApiResponse) {
  // Validate if the user has a valid JWT token
  if (!(await validateRequest(req))) {
    return res.status(401).json({ error: "You are not logged in" });
  }

  const { userId, image, userName } = req.body;

  if (!image && !userName) {
    return res.status(400).json({ error: "No image or name provided" });
  }

  let uploadedImageURL: string | void;
  if (image) {
    uploadedImageURL = await uploadImage({
      image,
      imageName: userId,
      directory: "profile",
      width: 256,
      height: 256,
    }).catch(() => {
      res.status(500).json({ error: "Error uploading image" });
    });
    if (!uploadedImageURL) {
      return;
    }
  }

  if (userName) {
    const user = await prisma.user.findUnique({
      where: {
        name: userName,
      },
    });
    if (user) {
      return res.status(400).json({ error: "User name already exists" });
    }
  }

  prisma.user
    .update({
      where: {
        id: userId,
      },
      data: {
        image: uploadedImageURL || undefined,
        name: userName || undefined,
      },
    })
    .then((user) => {
      if (!user) {
        // This should never happen but there might be a case where the account is no longer in the database but
        // the JWT token is still valid
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal database error" });
    });
}
