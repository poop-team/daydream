import { createContext } from "react";

const defaultValue = {
  currentTheme: "",
  changeCurrentTheme: (newTheme: "light" | "dark") => {},
};

const ThemeContext = createContext(defaultValue);

export default ThemeContext;
