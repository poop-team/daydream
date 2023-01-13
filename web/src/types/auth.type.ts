export interface AuthSession {
  jwt: string;
  userId: string;
  userName: string;
  userAvatar: string | null;
  isAllowedToCreate: boolean;
}
