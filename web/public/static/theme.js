// This exists to prevent flash of unstyled content (FOUC) on page load
// This script will load in src/pages/_document.tsx before the dom is painted
let theme = localStorage.getItem("theme");
if (!theme) {
  theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
if (theme === "dark") document.documentElement.classList.add("dark");
