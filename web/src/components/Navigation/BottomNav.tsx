import { useRouter } from "next/router";
import { MdAccountCircle, MdAddCircle, MdHome } from "react-icons/md";

import paths from "../../data/path";
import BottomNavLinkItem from "./BottomNavLinkItem";

export default function BottomNav() {
  //#region Hooks

  const router = useRouter();

  //#endregion

  //#region Derived State

  const isAuth =
    router.pathname == paths.login || router.pathname == paths.register;

  //#endregion

  return (
    <nav
      className={`fixed bottom-0 z-10 h-12 w-screen overflow-hidden rounded-t-xl bg-slate-50/70 backdrop-blur-md sm:hidden ${
        isAuth ? "hidden" : ""
      }`}
    >
      <ul className={"flex h-full list-none items-center justify-evenly"}>
        <BottomNavLinkItem href={"/feed"}>
          <MdHome className={"h-8 w-full"} />
        </BottomNavLinkItem>
        <BottomNavLinkItem href={"/create"}>
          <MdAddCircle className={"h-8 w-full"} />
        </BottomNavLinkItem>
        <BottomNavLinkItem href={"/profile"}>
          <MdAccountCircle className={"h-8 w-full"} />
        </BottomNavLinkItem>
      </ul>
    </nav>
  );
}
