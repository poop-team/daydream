import { AuthSession } from "@daydream/common";
import * as SecureStore from "expo-secure-store";

export async function storeAuthSession(session: AuthSession) {
  return await Promise.all([
    SecureStore.setItemAsync("jwt", session.jwt),
    SecureStore.setItemAsync("userId", session.userId),
    SecureStore.setItemAsync("userName", session.userName),
    SecureStore.setItemAsync("userAvatar", session.userAvatar ?? ""),
  ]);
}

export async function getAuthSession(): Promise<AuthSession> {
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
}

export async function clearAuthSession() {
  return await Promise.all([
    SecureStore.deleteItemAsync("jwt"),
    SecureStore.deleteItemAsync("userId"),
    SecureStore.deleteItemAsync("userName"),
    SecureStore.deleteItemAsync("userAvatar"),
  ]);
}
