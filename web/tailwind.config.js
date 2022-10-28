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
      gridTemplateColumns: {
        'fill-10': 'repeat(auto-fill, minmax(40vw, 1fr))',
        'fill-20': 'repeat(auto-fill, minmax(30vw, 1fr))',
        'fill-30': 'repeat(auto-fill, minmax(22vw, 1fr))',
        'fill-40': 'repeat(auto-fill, minmax(18vw, 1fr))',
      },
      lineClamp: {
        8: '8',
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
