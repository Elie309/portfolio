/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2C3E50',
        secondary: '#34495E',
        accent: '#1ABC9C',
        accentDark: '#16A085',
        light: '#ECF0F1',
      },
    },
  },
  plugins: [],
}

