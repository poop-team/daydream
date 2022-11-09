import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import path from "../data/path";
import { authenticateUser } from "../helpers/fetch";
import { ErrorRequest } from "../types/error.type";
import { clearAuthSession } from "../utils/storage";

export default function useRedirectUnauthenticated() {
  const router = useRouter();

  useQuery({
    queryKey: ["user"],
    queryFn: authenticateUser,
    onSuccess: () => {
      if (router.pathname === path.auth) {
        void router.push("/feed");
      }
    },
    onError: (error: ErrorRequest) => {
      if (error.cause?.code === 401) {
        clearAuthSession();
        if (router.pathname !== path.auth) {
          void router.push(path.auth);
        }
      }
    },
  });
}
