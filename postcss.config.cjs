// postcss.config.js
module.exports = {
    plugins: {
        // --- CHANGE MADE HERE ---
        // Use the dedicated PostCSS plugin for Tailwind CSS
        '@tailwindcss/postcss': {},
        // --- END CHANGE ---
        autoprefixer: {},
    },
};