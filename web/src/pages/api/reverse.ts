import { NextApiRequest, NextApiResponse } from "next";

interface Request extends NextApiRequest {
  body: {
    message: string;
  };
}

export default function handler(req: Request, res: NextApiResponse) {
  const message = req.body.message;

  res.json(message.split("").reverse().join(""));
}
