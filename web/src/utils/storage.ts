import { AuthSession } from "../types/auth.type";

export function storeAuthSession(session: AuthSession) {
  localStorage.setItem("jwt", session.jwt ?? "");
  localStorage.setItem("userName", JSON.stringify(session.userName));
  localStorage.setItem("userAvatar", session.userAvatar ?? "");
}

export function getAuthSession(): AuthSession {
  return {
    jwt: localStorage.getItem("jwt"),
    userName: localStorage.getItem("userName"),
    userAvatar: localStorage.getItem("userAvatar"),
  };
}
