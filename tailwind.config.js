/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  purge: {
    options: {
      safelist: ['bg-blue'],
    }
  },
  theme: {
    extend: {
      colors: {
        transparent: 'rgba(0,0,0,0)',
        textColor: 'hsl(180, 10%, 75%)', // matches gray-200
        'blue': {
          100: 'hsl(208, 100%, 80%)',
          200: 'hsl(208, 100%, 68%)',
          300: 'hsl(208, 100%, 55%)',
          400: 'hsl(208, 98%, 40%)',
          500: 'hsl(212, 92%, 30%)',
          600: 'hsl(212, 92%, 23%)',
          700: 'hsl(215, 88%, 19%)',
          800: 'hsl(218, 85%, 14%)',
          900: 'hsl(218, 90%, 8%)',
          DEFAULT: 'hsl(208, 100%, 55%)'
        },
        'purple': {
          100: 'hsl(275, 100%, 80%)',
          200: 'hsl(275, 100%, 70%)',
          300: 'hsl(278, 100%, 55%)',
          400: 'hsl(279, 92%, 40%)',
          500: 'hsl(282, 92%, 30%)',
          600: 'hsl(282, 88%, 23%)',
          700: 'hsl(285, 83%, 19%)',
          800: 'hsl(285, 70%, 14%)',
          900: 'hsl(285, 60%, 8%)',
          DEFAULT: 'hsl(279, 92%, 40%)'
        },
        'violet': {
          100: 'hsl(320, 100%, 80%)',
          200: 'hsl(320, 100%, 70%)',
          300: 'hsl(320, 100%, 55%)',
          400: 'hsl(320, 100%, 40%)',
          500: 'hsl(324, 98%, 30%)',
          600: 'hsl(324, 92%, 23%)',
          700: 'hsl(326, 88%, 19%)',
          800: 'hsl(330, 93%, 14%)',
          900: 'hsl(330, 80%, 8%)',
          DEFAULT: 'hsl(320, 100%, 40%)'
        },
        'red': {
          100: 'hsl(353, 90%, 80%)',
          200: 'hsl(353, 95%, 71%)',
          300: 'hsl(353, 85%, 59%)',
          400: 'hsl(353, 82%, 40%)',
          500: 'hsl(354, 85%, 29%)',
          600: 'hsl(356, 80%, 24%)',
          700: 'hsl(358, 78%, 19%)',
          800: 'hsl(360, 78%, 14%)',
          900: 'hsl(360, 90%, 8%)',
          DEFAULT: 'hsl(353, 82%, 40%)'
        },
        'orange': {
          100: 'hsl(32, 98%, 80%)',
          200: 'hsl(31, 97%, 70%)',
          300: 'hsl(27, 96%, 55%)',
          400: 'hsl(25, 95%, 40%)',
          500: 'hsl(21, 90%, 30%)',
          600: 'hsl(17, 88%, 23%)',
          700: 'hsl(15, 79%, 19%)',
          800: 'hsl(15, 75%, 14%)',
          900: 'hsl(13, 81%, 8%)',
          DEFAULT: 'hsl(25, 95%, 40%)'
        },
        'yellow': {
          100: 'hsl(58, 100%, 80%)',
          200: 'hsl(55, 100%, 70%)',
          300: 'hsl(53, 100%, 55%)',
          400: 'hsl(57, 100%, 42%)',
          500: 'hsl(50, 90%, 33%)',
          600: 'hsl(40, 88%, 27%)',
          700: 'hsl(37, 78%, 21%)',
          800: 'hsl(33, 73%, 15%)',
          900: 'hsl(31, 80%, 10%)',
          DEFAULT: 'hsl(57, 100%, 42%)'
        },
        'green': {
          100: 'hsl(120, 80%, 80%)',
          200: 'hsl(120, 80%, 70%)',
          300: 'hsl(120, 80%, 55%)',
          400: 'hsl(120, 78%, 40%)',
          500: 'hsl(120, 72%, 30%)',
          600: 'hsl(120, 68%, 23%)',
          700: 'hsl(120, 73%, 17%)',
          800: 'hsl(120, 90%, 12%)',
          900: 'hsl(120, 70%, 8%)',
          DEFAULT: 'hsl(120, 78%, 40%)'
        },
        'emerald': {
          100: 'hsl(165, 70%, 77%)',
          200: 'hsl(165, 99%, 76%)',
          300: 'hsl(165, 99%, 57%)',
          400: 'hsl(165, 90%, 40%)',
          500: 'hsl(165, 85%, 30%)',
          600: 'hsl(165, 75%, 22%)',
          700: 'hsl(167, 98%, 15%)',
          800: 'hsl(167, 95%, 11%)',
          900: 'hsl(165, 90%, 8%)',
          DEFAULT: 'hsl(165, 90%, 40%)'
        },
        'cyan': {
          100: 'hsl(189, 98%, 89%)',
          200: 'hsl(189, 98%, 79%)',
          300: 'hsl(189, 98%, 56%)',
          400: 'hsl(189, 95%, 40%)',
          500: 'hsl(189, 95%, 27%)',
          600: 'hsl(189, 100%, 20%)',
          700: 'hsl(189, 98%, 16%)',
          800: 'hsl(189, 98%, 11%)',
          900: 'hsl(189, 90%, 7%)',
          DEFAULT: 'hsl(189, 95%, 40%)'
        },
        'gray': {
          100: 'hsl(212, 28%, 92%)',
          200: 'hsl(212, 28%, 70%)',
          300: 'hsl(212, 28%, 55%)',
          400: 'hsl(212, 28%, 37%)',
          500: 'hsl(212, 28%, 26%)',
          600: 'hsl(212, 28%, 18%)',
          700: 'hsl(212, 28%, 13%)',
          800: 'hsl(212, 28%, 9%)',
          900: 'hsl(212, 28%, 2%)',
          DEFAULT: 'hsl(212, 28%, 13%)'
        },
        cclabDark: '#1c1c1c',
      },
      fontFamily: {
        'main': ['Poppins','Open Sans', 'Segoe UI', 'Roboto', 'Arial'],
      },
      spacing: {
          'base': 'clamp(5px, 5vw, 50px)',
          '95ch': 'clamp(10ch, 80%, 95ch)',
          'mainText': 'clamp(35ch, 100%, 100ch)',
          'comment': 'clamp(5px, 17vw, 500px)',
          'select':'calc(100% + 4px)',
          'qon':'clamp(10px, 2vw, 20px)',
          'nodeControls': 'clamp(250px, 100%, 400px)',
      },
      backgroundSize: {
        'size-200': '200% 200%', // helps with moving button gradients on hover
        'size-100': '100% 100%'
      },
      backgroundPosition: {
          'pos-0-l': '0% 0%', // helps with moving button gradients on hover - for top left gradients
          'pos-0-r': '100% 0%', // helps with moving button gradients on hover - for top right gradients
          'pos-100-l': '100% 100%', // helps with moving button gradients on hover - for top left gradients
          'pos-100-r': '0% 100%', // helps with moving button gradients on hover - for top right gradients
      },
      backgroundImage: {
        'header-full': "url('/images/header.jpg')",
        'header-small': "url('/images/banner.jpg')",
        'footer': "url('/images/footer.jpg')",
        'logo': "url('/svg/logo.svg')",
        'demo-map': "url('/images/demo/map.jpg')"
      },
      fontSize: {
        sm: ['clamp(0.4rem, 2vw, 0.9rem)', '1.25rem'],
      },
      height: {
        'screen-half': '50vh',
      },
      maxWidth: {
        'xsm': '150px',
      },
      dropShadow: {
        'md-dark': [
          '4px 4px 3px rgb(0 0 0 / 0.25)',
          '2px 2px 2px rgb(0 0 0 / 0.25)'
        ],
        'lg-dark': [
          '7px 7px 4px rgb(0 0 0 / 0.2)',
          '4px 4px 3px rgb(0 0 0 / 0.25)',
          '2px 2px 2px rgb(0 0 0 / 0.25)'
        ],
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite',
      }
    }
  },
  plugins: [],
}




