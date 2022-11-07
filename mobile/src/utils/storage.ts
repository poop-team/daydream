import { AuthSession } from "../types/auth.type";
import * as SecureStore from "expo-secure-store";

export async function storeAuthSession(session: AuthSession) {
  await SecureStore.setItemAsync("jwt", session.jwt);
  await SecureStore.setItemAsync("userId", session.userId);
  await SecureStore.setItemAsync("userName", session.userName);
  await SecureStore.setItemAsync("userAvatar", session.userAvatar ?? "");
}

export async function getAuthSession(): Promise<AuthSession> {
  let JWT = await SecureStore.getItemAsync("jwt");
  let userId = await SecureStore.getItemAsync("userId");
  let userName = await SecureStore.getItemAsync("userName");
  let userAvatar = await SecureStore.getItemAsync("userAvatar");

  return {
    jwt: JWT ?? "",
    userId: userId ?? "",
    userName: userName ?? "",
    userAvatar: userAvatar,
  };
}

export async function clearAuthSession() {
  await SecureStore.deleteItemAsync("jwt");
  await SecureStore.deleteItemAsync("userId");
  await SecureStore.deleteItemAsync("userName");
  await SecureStore.deleteItemAsync("userAvatar");
}
