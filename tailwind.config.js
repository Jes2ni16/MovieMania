/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      opacity: {
        fade: 0.6,
      },
      fontSize: {
        ms: "10px",
      },
      colors: {
        background: {
          dark: "#101115",
        },
        typography: {
          light: "#D3D3D4",
        },
        card: {
          dark: "#1C1F2A",
        },
        action: {
          brand: "#062794",
          dark: "#222326",
        },
        rated: {
          dark: "#3F4043",
        },
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("tailwind-scrollbar")],
};
