import { createContext } from "react";

const defaultValue = {
  currentTheme: "light" as "light" | "dark",
  changeCurrentTheme: (newTheme: "light" | "dark") => {},
};

const ThemeContext = createContext(defaultValue);

export default ThemeContext;
