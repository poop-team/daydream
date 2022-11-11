import { authenticateUser } from "@daydream/common/requests";
import { ErrorResponse } from "@daydream/common/types";
import { clearAuthSession } from "@daydream/common/utils";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import path from "../data/path";

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
    onError: (error: ErrorResponse) => {
      if (error.cause?.code === 401) {
        void clearAuthSession();
        if (router.pathname !== path.auth) {
          void router.push(path.auth);
        }
      }
    },
  });
}
