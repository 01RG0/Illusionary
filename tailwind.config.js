/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0066CC',
          hover: '#0052a3',
          active: '#004080',
        },
        secondary: {
          DEFAULT: '#00AA88',
          hover: '#008870',
          active: '#006653',
        },
        text: {
          primary: '#333333',
          secondary: '#666666',
          heading: '#222222',
        },
        background: {
          DEFAULT: '#FFFFFF',
          alt: '#F8F8F8',
        },
      },
      fontSize: {
        base: '1rem',
        tablet: '1.125rem',
      },
      maxWidth: {
        container: '1200px',
      },
      boxShadow: {
        sm: '0 2px 4px rgba(0,0,0,0.1)',
        md: '0 4px 6px rgba(0,0,0,0.1)',
      },
      borderRadius: {
        base: '4px',
        large: '8px',
      },
    },
  },
  plugins: [],
};