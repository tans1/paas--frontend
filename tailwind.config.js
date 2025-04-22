/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        reactLogo: "url(/public/logo192.png)",
        migrateImage: "url(/src/assets/migrate.jpg)",
      },
      colors: {
        primary: "#4f46e5",
        secondary: "#3b82f6",
        accent: "#9333ea",
        neutral: "#64748b",
        "base-100": "#ffffff",
        info: "#3abff8",
        success: "#36d399",
        warning: "#fbbd23",
        error: "#f87272",
        sidebarBgColor: "var(--sidebar-bg-color)",
        sidebarInactiveTabTextColor: "var(--sidebar-inactive-tab-text-color",
        sidebarActiveTabTextColor: "var(sidebar-active-tab-text-color",
      },
    },
  },
  plugins: [],
};
