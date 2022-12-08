import { ShareServiceClient } from "@azure/storage-file-share";
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
  seed = 0,
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
      cfg_scale: 8,
      height,
      width,
      seed,
      samples: 1,
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
    throw new Error("Error generating image or prompt rejected");
  }

  // Return base64 encoded imaged
  return `data:image/png;base64,${Buffer.from(
    await response.arrayBuffer()
  ).toString("base64")}`;
}

interface UploadParams {
  image: string;
  directory: "profile" | "generated";
  imageName?: string;
  width?: number;
  height?: number;
}

export async function uploadImage({
  image,
  directory,
  imageName = `${Date.now()}`,
  width = 512,
  height = 512,
}: UploadParams) {
  // Resize and compress the image before uploading it to azure file storage
  // Sharp will resize both images and animated gifs if the animated: true option is set
  // However, for the purposes of optimizing the image for the web, we will only use the first frame of a gif and convert it to a png
  const uri = image.split(";base64,").at(-1) as string;
  const resizedImage = await sharp(Buffer.from(uri, "base64"))
    .resize(width, height)
    .png({ quality: 95 })
    .toBuffer();

  if (!resizedImage) {
    throw new Error("Invalid image");
  }

  const account = "generalstorage00";
  const url = `https://${account}.file.core.windows.net`;
  const sas = env.AZURE_FILE_SHARE_SAS;

  const serviceClient = new ShareServiceClient(url + sas);

  const directoryClient = serviceClient
    .getShareClient("daydream")
    .getDirectoryClient(directory);

  const fileName = `${imageName}.png`
    .replaceAll(/[/\\?%*:|"<>]/g, "-") // Replace invalid characters with a dash
    .toLowerCase();
  const fileClient = directoryClient.getFileClient(fileName);
  await fileClient.create(resizedImage.length);

  return await fileClient
    .uploadRange(resizedImage, 0, resizedImage.length)
    .then(() => {
      const readOnlySas =
        "?sv=2021-06-08&ss=f&srt=o&sp=r&se=2077-01-02T03:37:12Z&st=2022-12-08T19:37:12Z&spr=https&sig=i5gAvionxPZ4MmmWvyQSWHRN%2B9YqwIiVUhN30cjk0dI%3D";

      return `${url}/daydream/${directory}/${fileName + readOnlySas}`;
    });
}
