import { sign } from "jsonwebtoken";

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
