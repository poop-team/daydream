/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextApiRequest, NextApiResponse } from "next";
import Replicate from "Replicate";

import { env } from "../../../env/server";
import { prisma } from "../../../server/db/client";
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

  //Whitelist users to use create posts. Prevent against me racking up 1k bill on replicate..

  if (userId != "clallm6nr000lmc107l8ov7ee") {
    return res
      .status(401)
      .json({ error: "You are not authenticated to create post." });
  }

  if (!prompt.trim()) {
    return res.status(402).json("No prompt provided");
  }

  // const url = `${env.DIFFUSION_URL}/txt2img?prompt=${prompt}&format=json`;

  // const sdRes = await fetch(url, {
  //   headers: {
  //     "X-API-Key": env.X_API_KEY,
  //     Accept: "application/json",
  //   },
  // });

  //Use replicate for production...
  const replicate = new Replicate({
    pollingInterval: 1000,
    token: env.X_API_KEY,
  });
  const DiffusionModel = await replicate.models.get(
    "stability-ai/stable-diffusion"
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const DiffusionModelPrediction = await DiffusionModel.predict({
    prompt: prompt,
  }).catch((err) => {
    return res.status(500).json({ error: err });
  });
  if (DiffusionModelPrediction == null) {
    return res.status(402).json({ error: "No image generated" });
  }
  const image = DiffusionModelPrediction[0];

  //return(res.json({'image': DiffusionModelPrediction[0]}));

  // if (sdRes.status == 406) {
  //   return res.status(403).json({ error: "NSFW prompt rejected" });
  // } else if (!sdRes.ok) {
  //   return res.status(500).json({ error: "Error while creating image" });
  // }
  //response data into json

  // const resData = (await sdRes.json()) as ResponseData;

  prisma.post
    .create({
      data: {
        prompt: prompt,
        imageURL: image,
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
