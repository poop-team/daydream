import { MdAccountCircle, MdAddCircle, MdHome } from "react-icons/md";

import BottomNavLinkItem from "./BottomNavLinkItem";

export default function BottomNav() {
  return (
    <nav
      className={
        "sticky bottom-0 -mt-12 h-12 w-screen rounded-t-xl bg-slate-300/90 sm:hidden"
      }
    >
      <ul className={"z-10 flex h-full list-none items-center justify-evenly"}>
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
