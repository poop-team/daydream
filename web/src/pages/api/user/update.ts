import { NextApiRequest, NextApiResponse } from "next";
import sharp from "sharp";

import { prisma } from "../../../server/db/client";
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

  let uploadedImageURL: string | null = null;
  if (image) {
    uploadedImageURL = await uploadImage(image, res);
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

async function uploadImage(image: string, res: NextApiResponse) {
  // Resize and compress the image before uploading it to imgur
  // Sharp will resize both images and animated gifs
  const uri = image.split(";base64,").at(-1) as string;
  const resizedImage = await sharp(Buffer.from(uri, "base64"))
    .resize(192, 192)
    .png({ quality: 90 })
    .toBuffer()
    .catch((err) => {
      console.error(err);
      res.status(400).json({ error: "Invalid image" });
      return null;
    });
  if (!resizedImage) {
    res.status(400).json({ error: "Invalid image" });
    return null;
  }

  const formData = new FormData();
  formData.append("image", resizedImage.toString("base64"));
  formData.append("type", "base64");
  const imageData = await fetch("https://api.imgur.com/3/image", {
    method: "POST",
    headers: {
      Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID as string}`,
      Accept: "application/json",
    },
    body: formData,
  });

  if (!imageData.ok) {
    res.status(400).json({ error: "Image upload failed" });
    return null;
  }

  const { data } = (await imageData.json()) as { data: { link: string } };
  if (!data.link) {
    res.status(400).json({ error: "Image upload failed" });
    return null;
  }
  return data.link;
}
