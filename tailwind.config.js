/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sage:    { DEFAULT: '#7a9e7e', light: '#a8c5ab', pale: '#d4e8d5', mist: '#eef5ee' },
        moss:    { DEFAULT: '#4a7c59', dark: '#2d5a3d' },
        cream:   { DEFAULT: '#f8f6f0', warm: '#f0ece0' },
        blush:   '#e8d5c4',
        petal:   '#c5dfc7',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        script:  ['"Dancing Script"', 'cursive'],
        body:    ['"Lora"', 'Georgia', 'serif'],
        sans:    ['"Jost"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
