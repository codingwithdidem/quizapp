/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: "var(--font-ubuntu)",
        jakarta: "var(--font-plus-jakarta-sans)",
      },
      colors: {
        brand: {
          "cerulean-blue": "#374CB7",
          "cerulean-blue-dark": "#3244a5",
          "storm-dust": "#636262",
          "white-smoke": "#F5F5F5",
          "white-smoke-100": "#F6F6F6",
          bittersweet: "#FF6A66",
          "bittersweet-dark": "#e65f5c",
          haiti: "#1B0330",
          "star-dust": "#9E9E9E",
          "paris-green": "#56C490",
          "light-gray": "#F2F2F2",
          midnight: "#1B0330",
          "mountain-mist": "#959595",
        },
      },
    },
  },
  plugins: [],
};
