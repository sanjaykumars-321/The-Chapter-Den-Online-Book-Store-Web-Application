/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: '"Alan Sans", sans-serif',
    },
    extend: {
      colors: {
        "paper-light": "#F5E9D3",
        "paper-warm": "#E8D6B3",
        "paper-mid": "#DCCBAA",
        "paper-dark": "#CDBA95",
        "paper-edge": "#BFAF8F",
      },
    },
  },
  plugins: [],
};
