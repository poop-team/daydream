export interface AuthSession {
  error?: string | null;
  jwt?: string | null;
  userId?: string | null;
  userName?: string | null;
  userAvatar?: string | null;
}
