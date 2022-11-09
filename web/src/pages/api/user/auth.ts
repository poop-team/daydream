import { NextApiRequest, NextApiResponse } from "next";

import { validateRequest } from "../../../utils/jwt";

// Authenticates the user and returns their user ID
export default async function get(req: NextApiRequest, res: NextApiResponse) {
  // Validate if the user has a valid JWT token
  if (!(await validateRequest(req))) {
    return res.status(401).json({ error: "User not logged in." });
  }

  res.json({ message: "Authenticated" });
}
