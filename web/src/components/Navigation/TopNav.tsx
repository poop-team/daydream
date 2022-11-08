import { AnimatePresence, motion, useScroll } from "framer-motion";
import debounce from "lodash/debounce";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import {
  MdAccountCircle,
  MdAddCircle,
  MdHome,
  MdSettings,
} from "react-icons/md";

import paths from "../../data/path";
import { navVariants, transitions } from "../../styles/motion-definitions";
import IconButton from "../Inputs/IconButton";
import LinkIconButton from "../Inputs/LinkIconButton";
import SearchBar from "../Inputs/SearchBar";

interface Props {
  setSearchValue: (value: string) => void;
}

export default function TopNav({ setSearchValue }: Props) {
  //#region Hooks

  const router = useRouter();

  const { scrollY } = useScroll();

  const [navHidden, setNavHidden] = useState(false);
  const [localSearchValue, setLocalSearchValue] = useState("");

  // Debounce the search value (don't immediately update it after every keystroke)
  const debouncedSetSearchValue = useMemo(
    () => debounce(setSearchValue, 300),
    []
  );

  useEffect(() => {
    // Set the term to query if a query parameter is present in the URL.
    if (!router.query.q) return;
    setSearchValue(router.query.q as string);
  }, [router.query.q]);

  // Cancel any pending debounced function calls when the component unmounts.
  useEffect(() => {
    return () => {
      debouncedSetSearchValue.cancel();
    };
  }, []);

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

  //#region Handlers

  const handleSearchChange = (value: string) => {
    setLocalSearchValue(value);
    debouncedSetSearchValue(value);
  };

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
      variants={navVariants}
      animate={navHidden ? "initialTop" : "animate"}
      transition={transitions.easeOut}
      className={navStyles}
    >
      <ul className={"flex h-full list-none items-center justify-between"}>
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
                <MdHome className={"h-full w-9"} />
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
                value={localSearchValue}
                onValueChange={handleSearchChange}
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
              variants={navVariants}
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
              variants={navVariants}
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
