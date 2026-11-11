/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          50: '#fdf2f4',
          100: '#fbe6e9',
          200: '#f7cfd6',
          300: '#f0aab7',
          400: '#e5778e',
          500: '#d54868',
          600: '#b82749',
          700: '#9b1b3b',
          800: '#800020', // Classic Burgundy #800020
          900: '#6D001A', // Deep Burgundy #6D001A
          950: '#42000e',
        },
        navy: {
          800: '#1e293b',
          900: '#0f172a',
          950: '#0a0f1d'
        },
        blue: {
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
