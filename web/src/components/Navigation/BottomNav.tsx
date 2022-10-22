import {
  MdAddCircleOutline,
  MdOutlineHome,
  MdPersonOutline,
} from "react-icons/md";

import BottomNavItem from "./BottomNavItem";

export default function BottomNav() {
  return (
    <nav
      className={
        "sticky bottom-0 h-12 w-screen rounded-t-xl bg-slate-300/90 sm:hidden"
      }
    >
      <ul
        className={
          "z-10 flex h-full list-none items-center justify-evenly text-sm"
        }
      >
        <BottomNavItem href={"/"}>
          <MdOutlineHome className={"h-8 w-full"} />
        </BottomNavItem>
        <BottomNavItem href={"/create"}>
          <MdAddCircleOutline className={"h-8 w-full"} />
        </BottomNavItem>
        <BottomNavItem href={"/profile"}>
          <MdPersonOutline className={"h-8 w-full"} />
        </BottomNavItem>
      </ul>
    </nav>
  );
}
