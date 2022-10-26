module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "600px",
        md: "720px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {},
      lineClamp: {
        10: '10',
        12: '12',
        14: '14',
        16: '16',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
