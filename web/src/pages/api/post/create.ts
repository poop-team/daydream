import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../utils/db/client";
import { generateImage, uploadImage } from "../../../utils/image";
import { validateRequest } from "../../../utils/jwt";
import { isUserAllowedToCreate } from "../../../utils/validation";

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

  const { userId, prompt: unsanitizedPrompt } = req.body;
  const prompt = unsanitizedPrompt.trim();

  if (!prompt) {
    return res.status(400).json({ error: "Empty prompt provided" });
  }

  // Validate if the user is allowed to create a post
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return res.status(400).json({ error: "User not found in database" });
  } else if (!isUserAllowedToCreate(user.email)) {
    return res.status(403).json({ error: "You are not allowed to create 😔" });
  }

  if (
    user.lastPostCreatedAt &&
    Date.now() - Date.parse(user.lastPostCreatedAt.toString()) < 1000 * 25
  ) {
    return res.status(403).json({ error: "You are creating images too fast" });
  }

  const imageBase64 = await generateImage({
    prompt,
    width: 512,
    height: 512,
  }).catch((e: Error) => {
    res.status(500).json({ error: e.message });
  });

  if (!imageBase64) {
    return;
  }

  const imageUrl = await uploadImage({
    image: imageBase64,
    directory: "generated",
    imageName: `${prompt} - ${new Date()
      .toUTCString()
      .replaceAll(/\s+|,\s+/g, "-")} - ${userId}`,
    width: 512,
    height: 512,
  }).catch(() => {
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
    .then(async (post) => {
      // Update the user's last post date
      await prisma.user
        .update({
          where: {
            id: userId,
          },
          data: {
            lastPostCreatedAt: new Date(),
          },
        })
        .catch((e: Error) => {
          console.error(e.message);
          return res.status(500).json({ error: "Internal database error" });
        });

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
