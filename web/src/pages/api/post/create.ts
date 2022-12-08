import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../utils/db/client";
import { generateImage, uploadImage } from "../../../utils/image";
import { validateRequest } from "../../../utils/jwt";

interface Request extends NextApiRequest {
  body: {
    userId: string;
    prompt: string;
  };
}

export default async function create(req: Request, res: NextApiResponse) {
  // Validate if the user has a valid JWT token
  if (!(await validateRequest(req))) {
    return res.status(401).json({ error: "You are not logged in" });
  }

  const { userId, prompt } = req.body;

  if (!prompt.trim()) {
    return res.status(400).json({ error: "Empty prompt provided" });
  }

  const imageBase64 = await generateImage({ prompt }).catch((e: Error) => {
    res.status(500).json({ error: e.message });
  });

  if (!imageBase64) {
    return;
  }

  const imageUrl = await uploadImage(imageBase64, 512, 512).catch(() => {
    res.status(500).json({ error: "Error uploading image" });
  });

  if (!imageUrl) {
    return;
  }

  prisma.post
    .create({
      data: {
        prompt: prompt,
        imageURL: imageUrl,
        authorId: userId,
      },
    })
    .then((post) => {
      return res.json({
        postId: post.id,
        prompt: post.prompt,
        image: post.imageURL,
      });
    })
    .catch((e: Error) => {
      console.error(e.message);
      return res.status(500).json({ error: "Internal database error" });
    });
}
