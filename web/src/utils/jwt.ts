import { sign, verify } from "jsonwebtoken";
import { NextApiRequest } from "next";

import { env } from "../env/server";

export const generateJWT = async (userId: string): Promise<string> => {
  // FIXME we should probably expire more often than 1/day
  return new Promise((resolve, reject) => {
    sign(
      { userId },
      env.JWT_PRIVATE_KEY,
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

export const generateJWTForPasswordReset = async (
  userId: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    sign(
      { userId },
      env.JWT_RESET_PRIVATE_KEY,
      { expiresIn: "20 minutes" },
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
    verify(jwt, env.JWT_PRIVATE_KEY, (err, data) => {
      const jwtUserId = (data as { userId: string }).userId;
      resolve(!err && jwtUserId === userId);
    });
  });
};

export const validateResetJWT = async (
  jwt: string | undefined
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!jwt) {
      throw Error("jwt should not be falsy!");
    }
    verify(jwt, env.JWT_RESET_PRIVATE_KEY, (err, data) => {
      if (err) {
        reject(err);
      }
      const jwtUserId = (data as { userId: string }).userId;
      resolve(jwtUserId);
    });
  });
};
