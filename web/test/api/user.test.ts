import { NextApiRequest, NextApiResponse } from "next";
import { createMocks } from "node-mocks-http";
import { describe, expect, it } from "vitest";

import get from "../../src/pages/api/user/get";
import { generateJWT } from "../../src/utils/jwt";

interface Res extends NextApiResponse {
  _getJSONData(): Record<string, unknown>;
}

describe("users", () => {
  it("should get a user", async () => {
    const { req, res }: { req: NextApiRequest; res: Res } = createMocks();
    const userId = "abc123";
    req.query = {
      userId,
      searchUserId: userId,
    };
    const jwt = await generateJWT(userId);
    req.headers = {
      authorization: `Bearer ${jwt}`,
    };
    /*
    await get(req, res);
    expect(res._getJSONData()).toEqual({
      hello: "world",
    });
    */
  });
});
