import { NextApiRequest, NextApiResponse } from "next";

//import Replicate from 'Replicate';
import { env } from "../../../env/server";
import { prisma } from "../../../server/db/client";
import { validateRequest } from "../../../utils/jwt";

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
    return res.status(401).json({ Error: "User not logged in." });
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

  const data = await fetch(url, {
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

  if (data.status == 406) {
    return res.status(403).json({ Error: "NSFW CONTENT REJECTED." });
  }
  //response data into json

  const resData = (await data.json()) as ResponseData;

  const post = await prisma.post.create({
    data: {
      prompt: prompt,
      imageURL: resData.image,
      authorId: userId,
    },
  });

  return res.json({
    postId: post.id,
    prompt: post.prompt,
    image: post.imageURL,
  });
}
