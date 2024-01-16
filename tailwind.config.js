/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",],
  darkmode: 'class',
  theme: {
    extend: {
      colors: {
        green: '#00ff00',
        yellow: '#ffff00',
        red: '#ff0000',
      },
      backgroundColor: {
        primary: 'var(--color-bg-primary)',
        primary2: 'var(--color-bg-primary2)',
        secondary: 'var(--color-bg-secondary)',
        button: 'var(--color-bg-button)',
      },
      textColor: {
        accent: 'var(--color-text-accent)',
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-bg-secondary)',
        btnText: 'var(--color-bg-secondary)',
      },
      borderColor: {
        primary: 'var(--color-bg-primary)',
        secondary: 'var(--color-bg-secondary)',
        input: 'var(--color-bg-input)',
        accent: 'var(--color-text-accent)',
      }
    },
  },
  plugins: [],
}

