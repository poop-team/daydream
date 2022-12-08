import sharp from "sharp";

import { env } from "./env/server";

interface GenerateParams {
  prompt: string;
  seed?: number;
  width?: number;
  height?: number;
}
export async function generateImage({
  prompt,
  seed = Math.floor(Math.random() * 1000000),
  width = 512,
  height = 512,
}: GenerateParams) {
  const engineId = "stable-diffusion-512-v2-1";
  const apiHost = "https://api.stability.ai";
  const url = `${apiHost}/v1alpha/generation/${engineId}/text-to-image`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "image/png",
      Authorization: env.STABILITY_API_KEY,
    },
    body: JSON.stringify({
      cfg_scale: 7,
      clip_guidance_preset: "FAST_BLUE",
      height,
      width,
      samples: 1,
      seed: seed,
      steps: 30,
      text_prompts: [
        {
          text: prompt,
          weight: 1,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Error generating image`);
  }
  // Return base64 encoded imaged
  return `data:image/png;base64,${Buffer.from(
    await response.arrayBuffer()
  ).toString("base64")}`;
}

export async function uploadImage(image: string, width = 512, height = 512) {
  // Resize and compress the image before uploading it to imgur
  // Sharp will resize both images and animated gifs if the animated: true option is set
  // However, for the purposes of optimizing the image for the web, we will only use the first frame of a gif and convert it to a png
  const uri = image.split(";base64,").at(-1) as string;
  const resizedImage = await sharp(Buffer.from(uri, "base64"))
    .resize(width, height)
    .png({ quality: 90 })
    .toBuffer();

  if (!resizedImage) {
    throw new Error("Invalid image");
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
    throw new Error("Image upload failed");
  }

  const { data } = (await imageData.json()) as { data: { link: string } };
  if (!data.link) {
    throw new Error("Image upload failed");
  }

  return data.link;
}
