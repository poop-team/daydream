import { NextApiRequest, NextApiResponse } from "next";

export const validateMethod = (
  method: string,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== method) {
    res.statusCode = 405;
    res.setHeader("Allow", method);
    res.json({
      error: "405 Method not allowed",
    });
    return false;
  }
  return true;
};
