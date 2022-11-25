import { PropsWithChildren, useEffect, useState } from "react";

import ThemeContext from "./ThemeContext";

export default function ThemeContextWrapper({ children }: PropsWithChildren) {
  //#region Hooks

  const [theme, setTheme] = useState<"light" | "dark" | undefined>();

  useEffect(() => {
    const theme = localStorage.getItem("theme") as "light" | "dark";
    if (theme) setTheme(theme);
    else
      setTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
      );
  }, []);

  useEffect(() => {
    if (theme === "light") document.documentElement.classList.remove("dark");
    else if (theme === "dark") document.documentElement.classList.add("dark");
  }, [theme]);

  //#endregion

  //#region Functions

  const changeCurrentTheme = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  //#endregion

  return (
    <ThemeContext.Provider
      // If the theme has not been determined yet (when rendering on the server), the theme will be set to light by default.
      // This will provide the app with a theme value, but it will avoid the flash of unstyled content (FOUC).
      value={{ currentTheme: theme ?? "light", changeCurrentTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
