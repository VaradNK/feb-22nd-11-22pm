/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#FF6B9D", // Vibrant pink
        "primary-hover": "#FF5588",
        "background-light": "#FFF5FB", // Very light pink
        "background-dark": "#2C241B", // Dark Espresso
        "retro-green": "#D4A5D4", // Lavender pink
        "retro-yellow": "#FFD4E5", // Light pink
        "retro-pink": "#FFB3D9", // Soft pink
        "note-yellow": "#FFF0F6",
        "note-blue": "#FFE5F0",
        "note-pink": "#FFCCE5",
        "note-green": "#F5D5F0",
        "pink-200": "#FFD4E5",
        "pink-300": "#FFC0D9",
        "pink-400": "#FF9DBE",
        "pink-500": "#FF7AA5",
        "pink-600": "#FF6B9D",
        "pink-700": "#E85A8C",
      },
      fontFamily: {
        display: ["'Shrikhand'", "serif"], // Bold Retro
        body: ["'Nunito'", "sans-serif"], // Soft Rounded
        hand: ["'Caveat'", "cursive"], // Handwriting
      },
      backgroundImage: {
        'noise': "url('https://www.transparenttextures.com/patterns/stardust.png')", 
      },
      boxShadow: {
        'retro': '4px 4px 0px 0px rgba(255, 107, 157, 0.25)',
        'retro-hover': '2px 2px 0px 0px rgba(255, 107, 157, 0.2)',
        'retro-bold': '6px 6px 0px 0px #FF6B9D',
      },
      animation: {
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
