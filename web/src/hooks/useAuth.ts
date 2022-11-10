import { AuthSession, getAuthSession } from "@daydream/common";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import path from "../data/path";

export default function useAuth() {
  const router = useRouter();
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    const session = getAuthSession();
    // This is probably not the best way to handle authentication, especially since we are using localStorage
    if (session.jwt) {
      setSession(session);
      if (router.pathname === path.auth) {
        void router.push("/feed");
      }
    } else {
      setSession(null);
      if (router.pathname !== path.auth) {
        void router.push("/auth");
      }
    }

    setSession(session);
  }, [router]);

  return {
    // This is probably not the best way to determine if the user is authenticated and it might be a better idea to check
    // with an endpoint that can verify the jwt but for now this will do.
    isLoggedIn: !!session?.jwt,
    name: session?.userName,
    avatar: session?.userAvatar,
  };
}
