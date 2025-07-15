/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'var(--color-brand, #2563eb)', // fallback to blue-600
          light: 'var(--color-brand-light, #60a5fa)',
          dark: 'var(--color-brand-dark, #1e40af)',
        },
        accent: {
          DEFAULT: 'var(--color-accent, #f59e42)',
        },
      },
      fontFamily: {
        brand: ['var(--font-brand)', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}

