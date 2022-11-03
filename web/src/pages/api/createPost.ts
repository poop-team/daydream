import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

//import Replicate from 'Replicate';
import { env } from "../../env/server";
import { validateRequest } from "../../utils/jwt";

interface ResponseData {
  image: string;
}

export default async function createPost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Validate if the user has a valid JWT token
  await validateRequest(req)
    .then((isValid) => {
      if (!isValid) {
        res.status(401).json({ error: "Invalid session" });
        return;
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Authorization Error" });
      return;
    });

  const prisma = new PrismaClient();
  const query = req.query;

  if (!query.prompt) {
    res.statusCode = 402;
    return res.json("No prompt provided");
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
  const url =
    env.DIFFUSION_URL +
    "/txt2img?prompt=" +
    (query.prompt as string) +
    "&format=json";

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
    res.statusCode = 403;
    return res.json({ Error: "NSFW CONTENT REJECTED." });
  }
  //response data into json

  const resData = (await data.json()) as ResponseData;

  const post = await prisma.post.create({
    data: {
      prompt: query.prompt.toString(),
      imageURL: resData.image,
      authorId: session.user?.id as string,
    },
  });

  return res.json({
    postId: post.id,
    prompt: query.prompt,
    image: resData.image,
  });
}
