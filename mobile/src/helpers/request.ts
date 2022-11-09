/**
 * Calls the fetch API with authorization and the passed parameters. If the response is not ok, it will throw an error.
 * @param url - The URL to call (e.g. /api/user/login)
 * @param body - The body of the request
 * @param method - The HTTP method to use (e.g. POST)
 * @returns The response from the API
 */
import { getAuthSession } from "../utils/storage";
import { ErrorResponse } from "../types/error.type";

export default async function doRequest<R>(
  url: string,
  body: any,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET"
): Promise<R> {
  const res = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${(await getAuthSession()).jwt || "NONE"}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    // try to parse for an error
    const data = (await res.json().catch(() => null)) as ErrorResponse | null;
    throw new Error(data?.error ?? "Unknown server error");
  }

  return (await res.json()) as R;
}
