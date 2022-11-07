import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  MdAccountCircle,
  MdAddCircle,
  MdHome,
  MdSettings,
} from "react-icons/md";

import paths from "../../data/path";
import { positionVariants, transitions } from "../../styles/motion-definitions";
import IconButton from "../Inputs/IconButton";
import LinkIconButton from "../Inputs/LinkIconButton";
import SearchBar from "../Inputs/SearchBar";

export default function TopNav() {
  //#region Hooks

  const router = useRouter();

  const { scrollY } = useScroll();

  const [navHidden, setNavHidden] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Set the term to query if a query parameter is present in the URL.
    if (!router.query.q) return;
    setSearchTerm(router.query.q as string);
  }, [router.query.q]);

  // On any change to the scroll position, updateHiddenState will be called.
  useEffect(() => scrollY.onChange(updateHiddenState), []);

  //#endregion

  //#region Helper Functions

  // Sets the hidden state of the nav bar based on the scroll direction.
  function updateHiddenState() {
    const startOffset = 48;
    const isScrollingUp = scrollY.get() < scrollY.getPrevious();
    const isScrollingDown =
      scrollY.get() > startOffset && scrollY.get() > scrollY.getPrevious();

    if (isScrollingUp) {
      setNavHidden(false);
    } else if (isScrollingDown) {
      setNavHidden(true);
    }
  }

  //#endregion

  //#region Derived State

  const isFeed = router.pathname === paths.feed;
  const isCreate = router.pathname === paths.create;
  const isProfile = router.pathname === paths.profile;
  const isAuth = router.pathname == paths.auth;

  //#endregion

  //#region Styles

  let navStyles =
    "fixed top-0 z-10 h-12 w-full overflow-hidden rounded-b-xl bg-slate-50/70 px-4 backdrop-blur-md";
  navStyles += isAuth ? " hidden" : ""; // Hide on auth pages.
  navStyles += isCreate ? " hidden sm:block" : ""; // Hide on mobile, show on desktop.

  //#endregion

  return (
    <motion.nav
      variants={positionVariants}
      animate={navHidden ? "initialTop" : "animate"}
      transition={transitions.easeOut}
      className={navStyles}
    >
      <ul className={"flex h-full list-none items-center justify-between"}>
        <AnimatePresence mode={"popLayout"} initial={false}>
          {!isFeed && (
            <motion.li
              key={"home"}
              variants={positionVariants}
              initial={"initialLeft"}
              animate={"animate"}
              exit={"initialLeft"}
              transition={transitions.springStiff}
              className={"hidden sm:block"}
            >
              <LinkIconButton href={"/feed"}>
                <MdHome className={"h-full w-9"} />
              </LinkIconButton>
            </motion.li>
          )}

          {isFeed && (
            <motion.li
              key={"search"}
              variants={positionVariants}
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
                <MdAddCircle className={"h-full w-9"} />
              </LinkIconButton>
            </motion.li>
          )}

          {isProfile ? (
            <motion.li
              key={"settings"}
              variants={positionVariants}
              initial={"initialRight"}
              animate={"animate"}
              exit={"initialRight"}
              whileHover={{ rotate: 20 }}
              transition={transitions.springStiff}
              className={"ml-auto"}
            >
              <IconButton>
                <MdSettings className={"h-full w-9"} />
              </IconButton>
            </motion.li>
          ) : (
            <motion.li
              key={"profile"}
              variants={positionVariants}
              initial={"initialRight"}
              animate={"animate"}
              exit={"initialRight"}
              transition={transitions.springStiff}
              className={"hidden sm:block"}
            >
              <LinkIconButton href={"/profile"}>
                <MdAccountCircle className={"h-full w-9"} />
              </LinkIconButton>
            </motion.li>
          )}
        </AnimatePresence>
      </ul>
    </motion.nav>
  );
}
