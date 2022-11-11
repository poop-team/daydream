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
      success: false,
      error: "405 Method not allowed",
    });
    return false;
  }
  return true;
};

export const validateString = (
  s: unknown,
  error: string,
  res: NextApiResponse
): boolean => {
  if (typeof s !== "string") {
    res.statusCode = 400;
    res.json({
      success: false,
      error,
    });
    return false;
  }
  return true;
};
