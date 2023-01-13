import { NextApiRequest, NextApiResponse } from "next";

export const createAllowedEmailDomains = [
  "robertboyd.dev",
  "raciel.dev",
  "knights.ucf.edu",
  "ucf.edu",
  "faiz.info",
];

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

export function isUserAllowedToCreate(email: string) {
  return createAllowedEmailDomains.some((domain) =>
    email.trim().toLowerCase().endsWith(domain)
  );
}
