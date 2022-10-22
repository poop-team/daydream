import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import {
  MdAccountCircle,
  MdAddCircle,
  MdClose,
  MdHome,
  MdSearch,
  MdSettings,
} from "react-icons/md";

import IconButton from "../Inputs/IconButton";
import TextField from "../Inputs/TextField";
import TopNavLinkButton from "./TopNavLinkButton";

export default function TopNav() {
  //#region Hooks

  const router = useRouter();

  const [search, setSearch] = useState("");

  useEffect(() => {
    // Set the term to query if a query parameter is present in the URL.
    if (!router.query.q) return;
    setSearch(router.query.q as string);
  }, [router.query.q]);

  //#endregion

  //#region Handlers

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleClearSearch = () => {
    setSearch("");
  };

  //#endregion

  //#region Derived state

  const isFeed = router.pathname === "/feed";
  const isCreate = router.pathname === "/create";
  const isProfile = router.pathname === "/profile";

  const isSearchActive = search.length > 0;

  return (
    <nav className={"sticky top-0 -mb-12 h-12 rounded-b-xl px-4"}>
      <ul className={"z-10 flex h-full list-none items-center justify-between"}>
        {!isFeed && (
          <li className={"hidden sm:block"}>
            <TopNavLinkButton href={"/feed"}>
              <MdHome className={"h-full w-8"} />
            </TopNavLinkButton>
          </li>
        )}

        {isFeed && (
          <li className={"flex grow items-center justify-center gap-2"}>
            <TextField
              startIcon={<MdSearch className={"h-full w-full"} />}
              endIcon={
                isSearchActive ? (
                  <IconButton
                    className={"h-full w-full"}
                    onClick={handleClearSearch}
                  >
                    <MdClose className={"h-full w-full"} />
                  </IconButton>
                ) : null
              }
              placeholder={"Search..."}
              className={"w-11/12 max-w-xl sm:w-2/3"}
              inputClassName={"py-0 px-4 rounded-3xl"}
              value={search}
              onChange={handleSearchChange}
            />
            <TopNavLinkButton
              href={"/create"}
              className={"hidden text-base sm:block"}
            >
              <MdAddCircle className={"h-8 w-full"} />
            </TopNavLinkButton>
          </li>
        )}

        {isProfile ? (
          <IconButton>
            <MdSettings className={"h-8 w-full"} />
          </IconButton>
        ) : (
          <li className={"hidden sm:block"}>
            <TopNavLinkButton href={"/profile"}>
              <MdAccountCircle className={"h-8 w-full"} />
            </TopNavLinkButton>
          </li>
        )}
      </ul>
    </nav>
  );
}
