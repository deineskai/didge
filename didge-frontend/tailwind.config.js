/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // WICHTIG: Scannt Flowbite-Komponenten
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin') // WICHTIG: Fügt die Flowbite-CSS-Logik hinzu
  ],
}