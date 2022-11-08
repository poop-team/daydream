import { AuthSession } from "../types/auth.type";
import * as SecureStore from "expo-secure-store";

export async function storeAuthSession(session: AuthSession) {
  Promise.all([
    SecureStore.setItemAsync("jwt", session.jwt),
    SecureStore.setItemAsync("userId", session.userId),
    SecureStore.setItemAsync("userName", session.userName),
    SecureStore.setItemAsync("userAvatar", session.userAvatar ?? ""),
  ]);
}

export async function getAuthSession(): Promise<AuthSession> {
  let JWT: string, userId: string, userName: string, userAvatar: string;
  Promise.all([
    SecureStore.getItemAsync("jwt"),
    SecureStore.getItemAsync("userId"),
    SecureStore.getItemAsync("userName"),
    SecureStore.getItemAsync("userAvatar"),
  ]).then((values) => {
    JWT = values[0];
    userId = values[1];
    userName = values[2];
    userAvatar = values[3];
  });

  return {
    jwt: JWT ?? "",
    userId: userId ?? "",
    userName: userName ?? "",
    userAvatar: userAvatar,
  };
}

export async function clearAuthSession() {
  Promise.all([
    SecureStore.deleteItemAsync("jwt"),
    SecureStore.deleteItemAsync("userId"),
    SecureStore.deleteItemAsync("userName"),
    SecureStore.deleteItemAsync("userAvatar"),
  ]);
}
