import Link from "next/link";
import { ReactNode } from "react";

import IconButton from "./IconButton";

interface Props {
  href: string;
  className?: string;
  children?: ReactNode;
}

export default function LinkIconButton({ href, className, children }: Props) {
  return (
    <Link href={href}>
      <a>
        <IconButton
          aria-label={`Navigate to ${href.replace("/", "")}`}
          className={className}
        >
          {children}
        </IconButton>
      </a>
    </Link>
  );
}
