/*
 * Functions to mutate/change data on the API
 */
import { AuthSession } from "../types/auth.type";

export async function login(email: string, password: string) {
  const res = await fetch("/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = (await res.json()) as AuthSession;
  if (!res.ok) {
    throw new Error(data.error || "Registration failed!");
  }
  return data;
}

export async function register(email: string, password: string) {
  const res = await fetch("/api/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = (await res.json()) as { error?: string };
  if (!res.ok) {
    throw new Error(data.error || "Registration failed!");
  }
}

import { CreatedPost } from "../types/post.type";

export async function createPost(prompt: string) {
  const res = await fetch(`/api/createPost?prompt=${prompt}`);
  return (await res.json()) as CreatedPost;
}
export async function likePost(postId: string) {}
export async function unlikePost(postId: string) {}
