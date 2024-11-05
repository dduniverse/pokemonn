/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Scanning for class names in your components
    "./src/styles/**/*.css",        // Corrected path for CSS files in the styles folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};