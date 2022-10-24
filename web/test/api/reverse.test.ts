import { describe, expect, it } from "vitest";

const GET = (url: string) =>
  fetch(`http://localhost:3000${url}`, {
    headers: {
      "content-type": "application/json",
    },
  });

const POST = (url: string, obj?: NonNullable<unknown>) =>
  fetch(`http://localhost:3000${url}`, {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: obj ? JSON.stringify(obj) : undefined,
  });

describe("reverse a POSTed string", () => {
  it("should echo 2", async () => {
    const rsp = await POST("/api/reverse", { message: "hello, world" }).then(
      (b) => b.json() as Promise<{ message: string }>
    );

    expect(rsp).toEqual("dlrow ,olleh");
  });
});
