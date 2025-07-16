// tailwind.config.js
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    theme: {
        extend: {
            colors: {
                'signmons-purple': '#6b46c1',
                'signmons-blue': '#00bcd4',
                'signmons-darkblue': '#00796b',
                'signmons-accent': '#ff7043',
            },
            boxShadow: {
                signmons: '8px 8px 0px 0px rgba(0, 0, 0, 0.1)',
            },
        },
    },
    plugins: [],
}
  