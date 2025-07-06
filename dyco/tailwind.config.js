module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,md}'],
  theme: {
    screens: {
      xs: '320px',
      sm: '375px',
      md: '768px',
      lg: '1240px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
      },
    },
    fontSize: {
      'title-hero': ['50px', '130%'],
      'title-1': ['42px', '135%'],
      'title-2': ['34px', '140%'],
      'title-3': ['30px', '145%'],
      'title-4': ['24px', '145%'],
      'title-5': ['20px', '145%'],

      'header-32': ['32px', '150%'],

      'subtitle-10': ['10px', '145%'],
      'subtitle-12': ['12px', '175%'],
      'subtitle-14': ['14px', '155%'],
      'subtitle-16': ['16px', '155%'],
      'subtitle-18': ['18px', '150%'],
      'subtitle-20': ['20px', '145%'],
      'subtitle-24': ['24px', '145%'],

      'body-12': ['12px', '150%'],
      'body-14': ['14px', '155%'],
      'body-16': ['16px', '155%'],
      'body-18': ['18px', '150%'],
      'body-20': ['20px', '145%'],

      'paragraph-14': ['12px', '180%'],
      'paragraph-16': ['12px', '155%'],
      'paragraph-18': ['12px', '145%'],
      'paragraph-20': ['12px', '150%'],
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C92836',
        },
        navy: {
          DEFAULT: '#081E37',
        },
        'dark-navy': {
          DEFAULT: '#081E37',
        },
        white: {
          DEFAULT: '#FFFFFF',
        },
        black: {
          DEFAULT: '#000000',
        },
        'light-blue': {
          DEFAULT: '#FAFBFC',
        },
        'light-gray': {
          DEFAULT: '#ECEDF0',
        },
        'map-disabled': {
          DEFAULT: '#3760F4',
        },
        'map-enabled': {
          DEFAULT: '#3760F4',
        },
      },
      zIndex: {
        '-10': '-10',
        '-20': '-20',
        '-30': '-30',
        '-40': '-40',
        '-50': '-50',
      },
      backgroundImage: {
        'section-partnering-sm': "url('/img/bg-partnering-sm.jpeg')",
        'section-partnering-md': "url('/img/bg-partnering-md.jpeg')",
        'section-partnering-lg': "url('/img/bg-partnering-lg.jpeg')",
        'section-resellers': "url('/img/bg-resellers.svg')",
        'hexagons-sm': "url('/img/bg-hexagons-sm.svg')",
        'hexagons-md': "url('/img/bg-hexagons-md.svg')",
        'hexagons-lg': "url('/img/bg-hexagons-lg.svg')",
      },
      listStyleType: {
        'lower-alpha': 'lower-alpha',
      },
      dropShadow: {
        heroTitle: '0px 0px 60px rgba(0, 0, 0, 0.5)',
      },
      scale: {
        175: '1.75',
        200: '2.00',
      },
    },
  },
  variants: {
    container: [],
    extend: {},
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
