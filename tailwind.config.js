/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        reactLogo: 'url(/public/logo192.png)',
        migrateImage: 'url(/src/assets/migrate.jpg)',
      },
    },
  },
  plugins: [],
}

