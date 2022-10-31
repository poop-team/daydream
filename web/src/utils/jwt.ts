import { sign, verify } from "jsonwebtoken";
import { NextApiRequest } from "next";

export const generateJWT = async (username: string): Promise<string> => {
  // FIXME we should probably expire more often than 1/day
  return new Promise((resolve, reject) => {
    if (!process.env.JWT_PRIVATE_KEY) {
      throw Error("Missing environment variable process.env.JWT_PRIVATE_KEY");
    }
    sign(
      username,
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: "1 day" },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          if (!data) {
            reject(Error("JWT signing failed!"));
          } else {
            resolve(data);
          }
        }
      }
    );
  });
};

export const validateRequest = async (
  req: NextApiRequest
): Promise<boolean> => {
  // eslint-disable-next-line
  const userId = (req.query.userId as string) ?? req.body.userId;
  // if you mistakenly pass in null/undefined somehow, don't validate
  if (!userId) {
    return Promise.resolve(false);
  }
  const authHeader = req.headers.authorization;
  const matches = authHeader?.match(/Bearer: (.*)/);
  const jwt = matches?.[1];
  return new Promise((resolve) => {
    if (!jwt || !process.env.JWT_PRIVATE_KEY) {
      throw Error("Missing environment variable process.env.JWT_PRIVATE_KEY");
    }
    verify(jwt, process.env.JWT_PRIVATE_KEY, (err, data) => {
      resolve(!err && data === userId);
    });
  });
};
