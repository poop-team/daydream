import { PropsWithChildren, useEffect, useState } from "react";

import ThemeContext from "./ThemeContext";

export default function ThemeContextWrapper({ children }: PropsWithChildren) {
  //#region Hooks

  const [theme, setTheme] = useState("");

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
    <ThemeContext.Provider value={{ currentTheme: theme, changeCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
