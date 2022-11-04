/**
 * Calls the fetch API with authorization and the passed parameters. If the response is not ok, it will throw an error.
 *
 * @param url - The URL to call (e.g. /api/user/login)
 * @param body - The body of the request
 *
 * @returns The response from the API
 */
import { getAuthSession } from "../utils/storage";

export default async function doRequest<R extends { error?: string | null }>(
  url: string,
  body: any
) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getAuthSession().jwt || "NONE"}`,
    },
    body: JSON.stringify(body),
  });
  const data = (await res.json()) as R;

  if (!res.ok) {
    throw new Error(data.error || "Error response received");
  }

  return data;
}
