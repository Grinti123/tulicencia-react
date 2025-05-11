/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        // Core brand colors
        primary: {
          DEFAULT: '#147A31',
          dark: '#0e6631',
          light: '#2a8951',
          lighter: '#e9f2e7',
        },
        secondary: {
          DEFAULT: '#e9f2e7',
          dark: '#d8e6d5',
        },
        text: {
          primary: '#1a602d',
          gray: '#606060',
          dark: '#333333',
          light: '#757575',
        },
        background: {
          light: '#f8f8ff',
          gray: '#f1f1ff',
          white: '#ffffff',
        },
        form: {
          border: '#d1d5db',
          focus: 'rgba(21, 122, 60, 0.3)',
          error: '#ef4444',
        },
      },
      borderRadius: {
        'circle': '50%',
        'button': '9999px',
        'card': '20px',
        'input': '8px',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '128': '32rem',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'button': '0 4px 6px -1px rgba(20, 122, 49, 0.25)',
        'input': '0 2px 4px rgba(0, 0, 0, 0.05)',
      },
      fontSize: {
        'xxs': '0.65rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      // Custom container sizes
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      // Custom screens
      screens: {
        'xs': '475px',
        // Default Tailwind breakpoints below
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      // Button-specific styles
      button: {
        sm: 'text-xs py-2 px-3 rounded-full',
        md: 'text-sm py-2 px-6 rounded-full',
        lg: 'text-base py-3 px-8 rounded-full',
      },
      // Input-specific styles
      input: {
        base: 'w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2',
      },
    },
  },
  plugins: [
    function({ addComponents, theme }) {
      addComponents({
        // Consistent layout containers
        '.content-container': {
          maxWidth: '1200px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4'),
          '@screen md': {
            paddingLeft: theme('spacing.6'),
            paddingRight: theme('spacing.6'),
          },
        },
        
        // Button variations
        '.btn': {
          display: 'inline-block',
          fontWeight: theme('fontWeight.medium'),
          borderRadius: theme('borderRadius.button'),
          transition: 'all 300ms ease',
        },
        '.btn-primary': {
          backgroundColor: theme('colors.primary.DEFAULT'),
          color: theme('colors.white'),
          '&:hover': {
            backgroundColor: theme('colors.primary.dark'),
          },
        },
        '.btn-secondary': {
          borderWidth: '2px',
          borderColor: theme('colors.primary.DEFAULT'),
          color: theme('colors.primary.DEFAULT'),
          backgroundColor: theme('colors.white'),
          '&:hover': {
            backgroundColor: theme('colors.primary.DEFAULT'),
            color: theme('colors.white'),
          },
        },
        '.btn-text': {
          color: theme('colors.primary.DEFAULT'),
          '&:hover': {
            color: theme('colors.primary.dark'),
          },
        },
        
        // Form field styles
        '.form-input': {
          width: '100%',
          padding: `${theme('spacing.3')} ${theme('spacing.4')}`,
          borderRadius: theme('borderRadius.input'),
          borderWidth: '1px',
          borderColor: theme('colors.form.border'),
          '&:focus': {
            outline: 'none',
            boxShadow: `0 0 0 3px ${theme('colors.form.focus')}`,
            borderColor: theme('colors.primary.DEFAULT'),
          },
        },
        '.form-error': {
          borderColor: theme('colors.form.error'),
        },
        
        // Card styles
        '.card': {
          borderRadius: theme('borderRadius.card'),
          padding: theme('spacing.6'),
          backgroundColor: theme('colors.white'),
          boxShadow: theme('boxShadow.card'),
        },
        '.card-primary': {
          backgroundColor: theme('colors.primary.lighter'),
        },
        
        // Animation classes
        '.fade-in': {
          animation: 'fadeIn 0.5s ease-in-out',
        },
        '.slide-in': {
          animation: 'slideIn 0.3s ease-in-out',
        },
      });
    }
  ],
} 