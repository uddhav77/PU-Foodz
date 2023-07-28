/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            custom: ["CustomFont", "sans-serif"],
            cursive: ["Cursive", "cursive"],
            fantasy: ["Fantasy", "fantasy"],
            custom: ["Georgia", "serif"],
            poppins: ['Poppins'],
        },
        extend: {},
    },
    variants: {},
    plugins: [],
}