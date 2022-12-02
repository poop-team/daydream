import { ReactNode } from "react";

import useAuthRedirect from "../hooks/useAuthRedirect";

interface Props {
  children: ReactNode;
}

export default function AuthRedirectWrapper({ children }: Props) {
  useAuthRedirect();

  return <>{children}</>;
}
