import * as SecureStore from "expo-secure-store";

import { AuthSession } from "../types";
import { isReactNative } from "./isReactNative";

export function storeAuthSession(session: AuthSession) {
  if (isReactNative()) {
    return Promise.all([
      SecureStore.setItemAsync("jwt", session.jwt),
      SecureStore.setItemAsync("userId", session.userId),
      SecureStore.setItemAsync("userName", session.userName),
      SecureStore.setItemAsync("userAvatar", session.userAvatar ?? ""),
    ]);
  }
  localStorage.setItem("jwt", session.jwt);
  localStorage.setItem("userId", session.userId);
  localStorage.setItem("userName", session.userName);
  localStorage.setItem("userAvatar", session.userAvatar ?? "");
}

export function getAuthSession<T>(): T extends "web"
  ? AuthSession
  : Promise<AuthSession> {
  if (isReactNative()) {
    return (async () => {
      const [jwt = "", userId = "", userName = "", userAvatar = ""] =
        await Promise.all([
          SecureStore.getItemAsync("jwt"),
          SecureStore.getItemAsync("userId"),
          SecureStore.getItemAsync("userName"),
          SecureStore.getItemAsync("userAvatar"),
        ]);

      return {
        jwt,
        userId,
        userName,
        userAvatar,
      };
    })() as T extends "web" ? AuthSession : Promise<AuthSession>;
  }
  // returning a promise just to make the types consistent
  // there's probably a better solution but it works
  return {
    jwt: localStorage.getItem("jwt") ?? "",
    userId: localStorage.getItem("userId") ?? "",
    userName: localStorage.getItem("userName") ?? "",
    userAvatar: localStorage.getItem("userAvatar"),
  } as T extends "web" ? AuthSession : Promise<AuthSession>;
}

export async function clearAuthSession() {
  if (isReactNative()) {
    return Promise.all([
      SecureStore.deleteItemAsync("jwt"),
      SecureStore.deleteItemAsync("userId"),
      SecureStore.deleteItemAsync("userName"),
      SecureStore.deleteItemAsync("userAvatar"),
    ]);
  }
  localStorage.removeItem("jwt");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("userAvatar");
}
