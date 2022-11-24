import { useRouter } from "next/router";
import { MdAccountCircle, MdAddCircle, MdHome } from "react-icons/md";

import paths from "../../data/path";
import useIsClient from "../../hooks/useIsClient";
import { getAuthSession } from "../../utils/storage";
import CustomImage from "../Surfaces/CustomImage";
import BottomNavLinkItem from "./BottomNavLinkItem";

export default function BottomNav() {
  //#region Hooks

  const router = useRouter();

  const isClient = useIsClient();

  //#endregion

  //#region Derived State

  const { userName, userAvatar } = (isClient && getAuthSession()) || {};

  const isFeed = router.pathname === paths.feed;
  const isCreate = router.pathname === paths.create;
  const isProfile = router.pathname.startsWith(paths.profile);
  const isAuth = router.pathname == paths.auth;

  //#endregion

  return (
    <nav
      className={`fixed bottom-0 z-10 h-12 w-screen overflow-hidden rounded-t-xl bg-slate-50/70 backdrop-blur-md dark:bg-slate-900/70 sm:hidden ${
        isAuth ? "hidden" : ""
      }`}
    >
      <ul className={"flex h-full list-none items-center justify-evenly"}>
        <BottomNavLinkItem selected={isFeed} href={paths.feed}>
          <MdHome className={"h-8 w-full"} />
        </BottomNavLinkItem>
        <BottomNavLinkItem selected={isCreate} href={paths.create}>
          <MdAddCircle className={"h-8 w-full"} />
        </BottomNavLinkItem>
        <BottomNavLinkItem
          selected={isProfile && router.query.id === userName}
          href={`${paths.profile}/${encodeURI(userName ?? "")}`}
        >
          {userAvatar ? (
            <CustomImage
              src={userAvatar}
              alt="User Avatar"
              fill
              priority
              sizes={"2.5rem"}
              draggable={false}
              containerClassName={"relative h-8 w-8 rounded-full"}
              className={"absolute h-full w-full rounded-full object-cover"}
            />
          ) : (
            <MdAccountCircle className={"h-full w-8"} />
          )}
        </BottomNavLinkItem>
      </ul>
    </nav>
  );
}
