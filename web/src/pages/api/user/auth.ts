import { validateRequest } from "@daydream/common";
import { NextApiRequest, NextApiResponse } from "next";

// Authenticates the user and returns their user ID
export default async function get(req: NextApiRequest, res: NextApiResponse) {
  // Validate if the user has a valid JWT token
  if (!(await validateRequest(req))) {
    return res.status(401).json({ error: "You are not logged in" });
  }

  res.json({ message: "Authenticated" });
}
