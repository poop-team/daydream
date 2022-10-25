import Link from "next/link";
import { ReactNode } from "react";

import IconButton from "../Inputs/IconButton";

interface Props {
  href: string;
  className?: string;
  children?: ReactNode;
}

export default function NavLinkButton({ href, className, children }: Props) {
  return (
    <Link href={href}>
      <IconButton
        aria-label={`Navigate to ${href.replace("/", "")}`}
        className={className}
      >
        {children}
      </IconButton>
    </Link>
  );
}
