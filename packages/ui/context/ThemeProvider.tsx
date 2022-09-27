import { createContext, useEffect } from "react";

interface Props {
  theme: Record<string, unknown>;
  children: JSX.Element;
}

export const ThemeContext = createContext({
  theme: {},
  // eslint-disable-next-line no-empty-function,@typescript-eslint/no-empty-function
  setThemeMode: (mode: string) => {},
});

/**
 * Theme Provider for Components which will allow the theme to be used and changed through useContext
 *
 * @param theme - The Tailwind theme to use from tailwind.config.js. Defaults to the components theme.
 * @param children
 * @returns
 */
export default function ThemeProvider({ theme, children }: Props) {
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  /**
   * Toggles the theme mode between light and dark. If "os" is passed, the theme mode is set to the OS theme.
   *
   * @param mode - The theme mode to set.
   */
  const setThemeMode = (mode: string): void => {
    // If OS Preference is selected, automatically set the theme
    if (mode === "os") {
      localStorage.removeItem("theme");
    }
    localStorage.theme = mode;
  };

  return (
    <ThemeContext.Provider value={{ theme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
