import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

import { transitions } from "../../styles/motion-definitions";

interface Props {
  href: string;
  className?: string;
  children?: ReactNode;
}

/**
 * A navigation item for the bottom navigation bar. The item is highlighted depending on the current route.
 *
 * @param href - The route to navigate to when the item is clicked.
 * @param className - Additional classes to apply to the item.
 * @param children - The content of the item.
 */
export default function BottomNavLinkItem({
  href,
  className = "",
  children,
}: Props) {
  //#region Hooks

  const router = useRouter();

  //#endregion

  //#region Derived state

  const selected =
    (router.pathname === "/" && href === "/") ||
    (router.pathname.startsWith(href) && href !== "/");

  //#endregion

  return (
    <li
      className={`${className} relative w-1/4 ${
        selected && "text-slate-50"
      } transition duration-200`}
    >
      <Link href={href}>
        <button
          className={"flex h-full w-full select-none flex-col items-center"}
          aria-label={`Navigate to ${href.replace("/", "")}`}
        >
          {children}
          <motion.div
            animate={{
              opacity: selected ? 1 : 0,
              scaleX: selected ? 1 : 0,
            }}
            transition={transitions.spring}
            className={`absolute -bottom-0.5 -z-10 h-9 w-full rounded-full bg-indigo-800/90`}
          />
        </button>
      </Link>
    </li>
  );
}
