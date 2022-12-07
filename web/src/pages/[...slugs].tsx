/*
  Catch all possible routes and redirect the user to the root slug.
  Any predefined route takes precedence so this won't override them.
*/
import { useRouter } from "next/router";
import { useEffect } from "react";

import paths from "../data/path";

export default function AnySlug() {
  const router = useRouter();

  useEffect(() => {
    void router.replace(paths.auth);
  }, [router]);
}
