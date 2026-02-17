export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        "./src/packages/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary-emphasis': 'hsl(var(--color-primary-emphasis))',
                'primary-emphasis-foreground': 'hsl(var(--color-primary-emphasis-foreground))',
            }
        },
    },
    plugins: [],
}
