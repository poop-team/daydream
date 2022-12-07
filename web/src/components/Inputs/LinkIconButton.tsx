import Link from "next/link";
import { AnchorHTMLAttributes, ReactNode } from "react";

import IconButton from "./IconButton";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
  children?: ReactNode;
}

export default function LinkIconButton({
  href,
  className,
  children,
  ...props
}: Props) {
  return (
    <Link href={href}>
      <a draggable={false} {...props} tabIndex={-1}>
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
