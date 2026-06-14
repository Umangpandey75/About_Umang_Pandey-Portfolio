/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        // Core palette
        primary: "#050816",
        "card-surface": "rgba(255,255,255,0.04)",
        "accent-gold": "#E8A045",
        "accent-violet": "#6B48FF",
        "body-text": "#AAAAAA",
        "heading-text": "#FFFFFF",

        // Legacy aliases (keep existing references working)
        secondary: "#AAAAAA",
        tertiary: "#0d0b1e",
        "black-100": "#0a0818",
        "black-200": "#050816",
        "white-100": "#f3f3f3",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0px 35px 120px -15px rgba(107, 72, 255, 0.25)",
        "card-gold": "0px 20px 80px -15px rgba(232, 160, 69, 0.2)",
        "nav-blur": "0 8px 32px rgba(5, 8, 22, 0.6)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.7s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(232, 160, 69, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(232, 160, 69, 0.7)" },
        },
      },
    },
  },
  plugins: [],
};
