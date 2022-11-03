import { useRouter } from "next/router";
import { useLayoutEffect, useState } from "react";

import path from "../data/path";
import { AuthSession } from "../types/auth.type";
import { getAuthSession } from "../utils/storage";

export default function useAuth() {
  const router = useRouter();
  const [session, setSession] = useState<AuthSession | null>(null);

  useLayoutEffect(() => {
    const session = getAuthSession();

    // This is probably not the best way to handle authentication, especially since we are using localStorage
    if (session.jwt) {
      setSession(session);
      if (router.pathname === path.auth) {
        void router.push("/feed");
      }
    } else {
      setSession(null);
      void router.push("/auth");
    }

    setSession(session);
  }, [router]);

  return {
    // This is probably not the best way to determine if the user is authenticated and it might be a better idea to check
    // with an endpoint that can verify the jwt but for now this will do.
    isLoggedIn: !!session?.jwt,
    name: session?.userName, // Nothing yet
    avatar: session?.userAvatar,
  };
}
