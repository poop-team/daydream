import { AuthSession } from "../types/auth.type";

export function storeAuthSession(session: AuthSession) {
  localStorage.setItem("jwt", session.jwt ?? "");
  localStorage.setItem("userId", session.userId ?? "");
  localStorage.setItem("userName", session.userName ?? "");
  localStorage.setItem("userAvatar", session.userAvatar ?? "");
}

export function getAuthSession(): AuthSession {
  return {
    jwt: localStorage.getItem("jwt"),
    userId: localStorage.getItem("userId"),
    userName: localStorage.getItem("userName"),
    userAvatar: localStorage.getItem("userAvatar"),
  };
}

export function clearAuthSession() {
  localStorage.removeItem("jwt");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("userAvatar");
}
