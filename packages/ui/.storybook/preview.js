import tailwindConfig from "config/tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";
import ThemeProvider from "../context/ThemeProvider";
import "../styles/globals.css";

const fullTailwindConfig = resolveConfig(tailwindConfig);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expanded: true,
  },
  layout: "centered",
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={fullTailwindConfig.theme}>
      <Story />
    </ThemeProvider>
  ),
];
