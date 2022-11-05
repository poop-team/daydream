/**
 * Calls the fetch API with authorization and the passed parameters. If the response is not ok, it will throw an error.
 *
 * @param url - The URL to call (e.g. /api/user/login)
 * @param body - The body of the request
 * @param method - The HTTP method to use (e.g. POST)
 *
 * @returns The response from the API
 */
import { getAuthSession } from "../utils/storage";

export default async function doRequest<R extends { error?: string | null }>(
  url: string,
  body: any,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET"
) {
  const res = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getAuthSession().jwt || "NONE"}`,
    },
    body: JSON.stringify(body),
  });

  const data = (await res.json().catch(() => {
    throw new Error("Invalid JSON response");
  })) as R;

  if (!res.ok) {
    throw new Error(data?.error || "Error response received");
  }

  return data;
}
