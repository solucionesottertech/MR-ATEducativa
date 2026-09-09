/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Primary brand - Navy (from client mockups)
        primary: {
          50: '#F3EFE9',
          100: '#E7E2DA',
          200: '#D4CFC7',
          300: '#BFBAB2',
          400: '#9A958D',
          500: '#6B665E',
          600: '#3D4A6E',
          700: '#202c4c', // Navy principal (official palette)
          800: '#16234A',
          900: '#0F1A38',
        },
        // Rosa (from client mockups)
        rosa: {
          50: '#FDF2F6',
          100: '#FBE5ED',
          200: '#F7CBD9',
          300: '#F3B1C5',
          400: '#E07FA8',
          500: '#d95986', // Rosa principal (official palette)
          600: '#B4436F',
          700: '#9F345F',
        },
        // Teal (from client mockups)
        teal: {
          50: '#F0F7F7',
          100: '#E1EFEE',
          200: '#C3DFDD',
          300: '#A5CFCB',
          400: '#87BFB9',
          500: '#7bb6b3', // Teal principal (official palette)
          600: '#6CAAA3',
          700: '#5C9790',
        },
        // Naranja/Amber (from client mockups)
        naranja: {
          50: '#FFFBF0',
          100: '#FFF3E1',
          200: '#FFE7C3',
          300: '#FFDBB5',
          400: '#FFCF97',
          500: '#ffbb5d', // Amber principal (official palette)
          600: '#E6A344',
          700: '#D1923A',
        },
        // Service area colors - Mapeo a colores oficiales
        liderazgo: {
          50: '#F3EFE9',
          100: '#E7E2DA',
          200: '#D4CFC7',
          300: '#BFBAB2',
          400: '#9A958D',
          500: '#6B665E',
          600: '#3D4A6E',
          700: '#202c4c',
        },
        pedagogica: {
          50: '#FDF2F6',
          100: '#FBE5ED',
          200: '#F7CBD9',
          300: '#F3B1C5',
          400: '#E07FA8',
          500: '#d95986',
          600: '#B4436F',
          700: '#9F345F',
        },
        convivencia: {
          50: '#FFFBF0',
          100: '#FFF3E1',
          200: '#FFE7C3',
          300: '#FFDBB5',
          400: '#FFCF97',
          500: '#ffbb5d',
          600: '#E6A344',
          700: '#D1923A',
        },
        recursos: {
          50: '#F0F7F7',
          100: '#E1EFEE',
          200: '#C3DFDD',
          300: '#A5CFCB',
          400: '#87BFB9',
          500: '#7bb6b3',
          600: '#6CAAA3',
          700: '#5C9790',
        },
        mentoria: {
          50: '#F4F0F9',
          100: '#E9E1F3',
          200: '#D4C5E8',
          300: '#BFAADD',
          400: '#9A7BC0',
          500: '#a775b1',
          600: '#8B6299',
          700: '#7A5288',
        },
        // Warm neutrals (editorial feel from mockups)
        neutral: {
          50: '#FBF9F6',
          100: '#F3EFE9',
          200: '#E7E2DA',
          300: '#D4CFC7',
          400: '#9A958D',
          500: '#6B665E',
          600: '#4B4640',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#030712',
        },
      },
      fontFamily: {
        heading: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        expression: ['"CO59"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        // Fluid typography with clamp()
        'display': ['clamp(2.5rem, 5vw + 1rem, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'heading-1': ['clamp(2rem, 3vw + 0.5rem, 3.5rem)', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'heading-2': ['clamp(1.75rem, 2vw + 0.5rem, 2.75rem)', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '600' }],
        'heading-3': ['clamp(1.25rem, 1.5vw + 0.25rem, 1.75rem)', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.7', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6', fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1.5', fontWeight: '500', letterSpacing: '0.05em' }],
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
        'input': '8px',
      },
      spacing: {
        'section': 'clamp(4rem, 8vw, 7.5rem)',
        'section-sm': 'clamp(3rem, 6vw, 5rem)',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
        'card-hover': '0 10px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.04)',
        'button': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'button-hover': '0 4px 12px -2px rgb(37 99 235 / 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
