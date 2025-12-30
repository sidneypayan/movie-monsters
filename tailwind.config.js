/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0A0A0A',
          surface: '#0F0A0F',
          elevated: '#1A141A',
          border: '#2A1F2A',
        },
        gothic: {
          purple: '#1A0A1F',
          'purple-light': '#2D1B3D',
          crimson: '#4A0E0E',
          'crimson-light': '#6B1818',
        },
        accent: {
          red: '#DC143C',
          'red-dark': '#8B0000',
          purple: '#9D4EDD',
          gold: '#D4AF37',
        },
        text: {
          primary: '#F5F5F5',
          secondary: '#B8A0B8',
          muted: '#6B5B6B',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
