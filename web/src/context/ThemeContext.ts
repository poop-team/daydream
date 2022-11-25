import { createContext } from "react";

const defaultValue: {
  currentTheme: "light" | "dark";
  changeCurrentTheme: (newTheme: "light" | "dark") => void;
} = {
  currentTheme: "light",
  changeCurrentTheme: (newTheme: "light" | "dark") => {},
};

const ThemeContext = createContext(defaultValue);

export default ThemeContext;
