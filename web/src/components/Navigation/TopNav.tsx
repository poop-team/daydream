import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import {
  MdAccountCircle,
  MdAddCircle,
  MdDarkMode,
  MdHome,
  MdLogout,
  MdSettings,
} from "react-icons/md";

import ThemeContext from "../../context/ThemeContext";
import paths from "../../data/path";
import useIsClient from "../../hooks/useIsClient";
import { positionVariants, transitions } from "../../styles/motion-definitions";
import { clearAuthSession, getAuthSession } from "../../utils/storage";
import Button from "../Inputs/Button";
import IconButton from "../Inputs/IconButton";
import LinkIconButton from "../Inputs/LinkIconButton";
import PopoverButton from "../Inputs/PopoverButton";
import SearchBar from "../Inputs/SearchBar";
import CustomImage from "../Surfaces/CustomImage";

interface Props {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export default function TopNav({ searchValue, setSearchValue }: Props) {
  //#region Hooks

  const router = useRouter();

  const { currentTheme, changeCurrentTheme } = useContext(ThemeContext);

  const isClient = useIsClient();

  const { scrollY } = useScroll();

  const [navHidden, setNavHidden] = useState(false);

  useEffect(() => {
    // Set the term to query if a query parameter is present in the URL.
    if (!router.query.q) return;
    setSearchValue(router.query.q as string);
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

  const { userName, userAvatar } = (isClient && getAuthSession()) || {};

  const isFeed = router.pathname === paths.feed;
  const isCreate = router.pathname === paths.create;
  const isProfile = router.pathname.startsWith(paths.profile);
  const isOwnProfile = isProfile && router.query.id === userName;
  const isAuth = router.pathname == paths.auth;

  //#endregion

  //#region Styles

  let navStyles =
    "fixed top-0 z-10 h-14 w-full rounded-b-xl bg-slate-50/70 px-4 backdrop-blur-md dark:bg-slate-900/70";
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
                <MdHome className={"h-full w-10"} />
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
                value={searchValue}
                onValueChange={setSearchValue}
                className={"w-11/12 max-w-xl sm:w-2/3"}
              />
              <LinkIconButton
                href={`/create?prompt=${encodeURI(searchValue)}`}
                className={"hidden text-base sm:block"}
              >
                <MdAddCircle className={"h-full w-10"} />
              </LinkIconButton>
            </motion.li>
          )}

          {!isOwnProfile ? (
            <motion.li
              key={"profile"}
              variants={positionVariants}
              initial={"initialRight"}
              animate={"animate"}
              exit={"initialRight"}
              transition={transitions.springStiff}
              className={"hidden sm:block"}
            >
              <LinkIconButton href={`/profile/${encodeURI(userName ?? "")}`}>
                {userAvatar ? (
                  <CustomImage
                    src={userAvatar}
                    alt="User Avatar"
                    fill
                    priority
                    sizes={"2.5rem"}
                    draggable={false}
                    containerClassName={"relative h-10 w-10 rounded-full"}
                    className={
                      "absolute h-full w-full rounded-full object-cover"
                    }
                  />
                ) : (
                  <MdAccountCircle className={"h-full w-10"} />
                )}
              </LinkIconButton>
            </motion.li>
          ) : (
            <motion.li
              key={"settings"}
              variants={positionVariants}
              initial={"initialRight"}
              animate={"animate"}
              exit={"initialRight"}
              transition={transitions.springStiff}
              className={"ml-auto"}
            >
              <PopoverButton
                button={IconButton}
                buttonChildren={<MdSettings className={"h-full w-10"} />}
                rotateButtonOnOpen={true}
              >
                {({ close }) => (
                  <div className={"flex flex-col gap-1"}>
                    <Button
                      variant={"text"}
                      onClick={() => {
                        changeCurrentTheme(
                          currentTheme === "light" ? "dark" : "light"
                        );
                      }}
                      className={"w-full !justify-start"}
                    >
                      <MdDarkMode />
                      Toggle Theme
                    </Button>
                    <Button
                      variant={"text"}
                      onClick={() => {
                        close();
                        clearAuthSession();
                        void router.replace(paths.auth);
                      }}
                      className={"w-full !justify-start"}
                    >
                      <MdLogout />
                      Sign Out
                    </Button>
                  </div>
                )}
              </PopoverButton>
            </motion.li>
          )}
        </AnimatePresence>
      </ul>
    </motion.nav>
  );
}
