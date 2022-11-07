/*
 * Functions to mutate/change data on the API 
 * same as web/src/helpers/mutate.ts
 */
import * as SecureStore from 'expo-secure-store';

export async function login(email: string, password: string) {
    return await doRequest<AuthSession>(
      "/api/user/login",
      {
        userId: getAuthSession().userId,
        email,
        password,
      },
      "POST"
    );
  }
  
  export async function register(name: string, email: string, password: string) {
    await doRequest(
      "/api/user/register",
      {
        userId: getAuthSession().userId,
        name,
        email,
        password,
      },
      "POST"
    );
  }
  
  export async function createPost(prompt: string) {}
  export async function likePost(postId: string) {}
  export async function unlikePost(postId: string) {}
  