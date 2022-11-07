import { sign, verify } from "jsonwebtoken";
import { NextApiRequest } from "next";

export const generateJWT = async (userId: string): Promise<string> => {
  // FIXME we should probably expire more often than 1/day
  return new Promise((resolve, reject) => {
    if (!process.env.JWT_PRIVATE_KEY) {
      throw Error("Missing environment variable process.env.JWT_PRIVATE_KEY");
    }
    sign(
      { userId },
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
  const matches = authHeader?.match(/Bearer (.*)/);
  const jwt = matches?.[1];
  return await validateJWT(userId, jwt).catch(() => false);
};

export const validateJWT = async (
  userId: string,
  jwt: string | undefined
): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!jwt) {
      throw Error("jwt should not be falsy!");
    }
    if (!process.env.JWT_PRIVATE_KEY) {
      throw Error("Missing environment variable process.env.JWT_PRIVATE_KEY");
    }

    verify(jwt, process.env.JWT_PRIVATE_KEY, (err, data) => {
      const jwtUserId = (data as { userId: string }).userId;
      resolve(!err && jwtUserId === userId);
    });
  });
};
