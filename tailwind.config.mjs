/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Neutral adaptable palette — awaiting official Epso brand colours
        // Replace these when logo/packaging is supplied
        brand: {
          50:  '#f8f9fa',
          100: '#f0f2f5',
          200: '#e1e5eb',
          300: '#c8d0dc',
          400: '#9daab8',
          500: '#6b7a8d',
          600: '#4a5568',
          700: '#2d3748',
          800: '#1a202c',
          900: '#0f1420',
          950: '#080b11',
        },
        accent: {
          50:  '#fff9eb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#eb8d35',
          700: '#d97706',
          800: '#b45309',
          900: '#78350f',
        },
        orangeGradient: {
          0:   '#ffffff',
          100: '#fff6ee',
          200: '#fdebd3',
          300: '#f8dbb3',
          400: '#f6cc94',
          500: '#f3ba74',
          600: '#f0ac5a',
          700: '#ee9e47',
          800: '#ec943b',
          900: '#eb8d35',
        },
        success: '#16a34a',
        error: '#dc2626',
      },
      backgroundImage: {
        'page-gradient': 'linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 8%, #FFF7EE 18%, #FDEBD3 32%, #F8DBB3 46%, #F6CC94 60%, #F3BA74 72%, #F0AC5A 82%, #EE9E47 91%, #EB8D35 100%)',
        'subpage-gradient': 'linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 12%, #FFF8F0 24%, #FDEBD3 42%, #F8DBB3 60%, #F6CC94 75%, #F3BA74 88%, #EB8D35 100%)',
      },
      boxShadow: {
        'glass': '0 8px 30px rgba(235, 141, 53, 0.07)',
        'glass-hover': '0 20px 40px rgba(235, 141, 53, 0.16)',
        'glass-sm': '0 4px 20px rgba(0, 0, 0, 0.04)',
        'glow-orange': '0 0 50px -10px rgba(235, 141, 53, 0.45)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Insanibc', 'system-ui', 'sans-serif'],
        insanibc: ['Insanibc', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        'screen-xl': '1280px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

