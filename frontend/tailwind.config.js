/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          light: "#ffffff", // Pure White
          dark: "#0A120B", // Deep Forest Dark
        },
        primary: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#FFC107", // Amber/Saffron (User requested)
          600: "#FFA000", // Darker Amber
          700: "#FF8F00",
          800: "#FF6F00",
          900: "#451A03", // Deep Chocolate
        },
        royal: {
          gold: "#C5A059",
          cream: "#FFFDF5",
          saffron: "#FFC107",
          emerald: "#064E3B",
          chocolate: "#451A03", // High-Contrast Title Color
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', "serif"],
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        fadeIn: "fadeIn 0.8s ease-out forwards",
        slowSpin: "slowSpin 20s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slowSpin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      boxShadow: {
        premium:
          "0 10px 30px -10px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05)",
        "premium-hover":
          "0 20px 40px -15px rgba(0, 0, 0, 0.2), 0 8px 12px -8px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
