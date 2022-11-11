import { validateRequest } from "@daydream/common";
import { NextApiRequest, NextApiResponse } from "next";

//import Replicate from 'Replicate';
import { env } from "../../../env/server";
import { prisma } from "../../../server/db/client";

interface Request extends NextApiRequest {
  body: {
    userId: string;
    prompt: string;
  };
}

interface ResponseData {
  image: string;
}

export default async function create(req: Request, res: NextApiResponse) {
  // Validate if the user has a valid JWT token
  if (!(await validateRequest(req))) {
    return res.status(401).json({ error: "You are not logged in" });
  }

  const { userId, prompt } = req.body;

  if (!prompt.trim()) {
    return res.status(402).json("No prompt provided");
  }

  // const settings = [
  //     {
  //         'prompt': query.prompt,
  //         'format': 'json',
  //         'guidance_scale': 7.5,
  //         'num_inference_steps': 50,
  //         'num_images': 1,
  //         'height': 512,
  //         'width': 512,
  //         'use_ldm': false,
  //     },
  // ];
  const url = `${env.DIFFUSION_URL}/txt2img?prompt=${prompt}&format=json`;

  const sdRes = await fetch(url, {
    headers: {
      "X-API-Key": env.X_API_KEY,
      Accept: "application/json",
    },
  });

  // Use replicate for production...
  // const replicate = new Replicate({pollingInterval: 1000, token: env.X_API_KEY});
  // const DiffusionModel = await replicate.models.get("stability-ai/stable-diffusion");
  // const DiffusionModelPrediction = await DiffusionModel.predict({ prompt: query.prompt});

  // console.log(DiffusionModelPrediction[0]);
  // return(res.json({'image': DiffusionModelPrediction[0]}));

  if (sdRes.status == 406) {
    return res.status(403).json({ error: "NSFW prompt rejected" });
  } else if (!sdRes.ok) {
    return res.status(500).json({ error: "Error while creating image" });
  }
  //response data into json

  const resData = (await sdRes.json()) as ResponseData;

  prisma.post
    .create({
      data: {
        prompt: prompt,
        imageURL: resData.image,
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
