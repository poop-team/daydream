import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  MdAccountCircle,
  MdAddCircle,
  MdHome,
  MdSettings,
  MdArrowBackIosNew,
} from "react-icons/md";

import { navVariants, transitions } from "../../styles/motion-definitions";
import IconButton from "../Inputs/IconButton";
import LinkIconButton from "../Inputs/LinkIconButton";
import SearchBar from "../Inputs/SearchBar";

export default function TopNav() {
  //#region Hooks

  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Set the term to query if a query parameter is present in the URL.
    if (!router.query.q) return;
    setSearchTerm(router.query.q as string);
  }, [router.query.q]);

  //#endregion

  //#region Handlers

  //#endregion

  //#region Derived State

  const isFeed = router.pathname === "/feed";
  const isCreate = router.pathname === "/create";
  const isProfile = router.pathname === "/profile";
  const isLogin = router.pathname == "/login"

  //#endregion

  return (
    <nav className={"sticky top-0 -mb-12 h-12 rounded-b-xl px-4"}>
      <ul className={"z-10 flex h-full list-none items-center justify-between"}>
        <AnimatePresence mode={"popLayout"} initial={false}>
          
          {!isFeed && (
            <motion.li
              key={"home"}
              variants={navVariants}
              initial={"initialLeft"}
              animate={"animate"}
              exit={"initialLeft"}
              transition={transitions.springStiff}
              className={"hidden sm:block"}
            >
              <LinkIconButton href={"/feed"}>
                <MdHome className={"h-full w-8"} />
              </LinkIconButton>
            </motion.li>
          )}

          {isFeed && (
            <motion.li
              key={"search"}
              variants={navVariants}
              initial={"initialTop"}
              animate={"animate"}
              exit={"initialTop"}
              transition={transitions.springStiff}
              className={"flex grow items-center justify-center gap-2"}
            >
              <SearchBar
                value={searchTerm}
                onValueChange={setSearchTerm}
                className={"w-11/12 max-w-xl sm:w-2/3"}
              />
              <LinkIconButton
                href={"/create"}
                className={"hidden text-base sm:block"}
              >
                <MdAddCircle className={"h-8 w-full"} />
              </LinkIconButton>
            </motion.li>
          )}

          {isProfile ? (
            <motion.li
              key={"settings"}
              variants={navVariants}
              initial={"initialRight"}
              animate={"animate"}
              exit={"initialRight"}
              whileHover={{ rotate: 20 }}
              transition={transitions.springStiff}
              className={"ml-auto"}
            >
              <IconButton>
                <MdSettings className={"h-8 w-full"} />
              </IconButton>
            </motion.li>
          ) : (
            <motion.li
              key={"profile"}
              variants={navVariants}
              initial={"initialRight"}
              animate={"animate"}
              exit={"initialRight"}
              transition={transitions.springStiff}
              className={"hidden sm:block"}
            >
              <LinkIconButton href={"/profile"}>
                <MdAccountCircle className={"h-8 w-full"} />
              </LinkIconButton>
            </motion.li>
          )}

          
        </AnimatePresence>
      </ul>
    </nav>
  );
}
