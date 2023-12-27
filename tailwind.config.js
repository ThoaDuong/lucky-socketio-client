/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'flex': ['"IBM Plex Serif"', 'serif']
            },
            gridTemplateRows: {
                '10': 'repeat(10, minmax(0, 1fr))',
            },
            gridRow: {
                'span-7': 'span 7 / span 7',
                'span-8': 'span 8 / span 8',
                'span-9': 'span 9 / span 9',
                'span-10': 'span 10 / span 10',
            },
            screens: {
                'ipad': {'raw': '((min-height:768px)and(min-width:1024px))'},
                'desktop': {'raw': '(min-height:1024px)'}
            },
            lineHeight: {
            },
            animation: {
                marquee: 'marquee 20s linear infinite',
                marquee2: 'marquee2 20s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                marquee2: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0%)' },
                },
            },
        }
    },
    plugins: [],
  }