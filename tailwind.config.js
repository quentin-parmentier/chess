module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight:{
        fullvh:"100vh"
      },
      height:{
        px425:"425px"
      },
      inset:{
        vh80:"80vh",
        vw85:"85vw"
      },
      margin:{
        n143:"-143.5px",
        n188:"-188px",
        n214:"-214px",
      },
      maxWidth:{
        px800:"800px"
      },
      boxShadow: {
        "basic":"#c7c6c6 6px 7px 8px 0px",
        "up": "#c7c6c6 12px 21px 8px 0px",
        'innerinput': 'inset 0 0px 0px 1px rgb(209, 213, 219)',
        'innerinput-focus': 'inset 0 1px 4px 0px rgb(178 0 0)'
      },
      animation: {
        "pop" : "pop ease 300ms",
        "write": "write ease 1000ms"
      },
      backgroundImage: {
        'arrow_back': "url('./assets/img/arrow_back.svg')",
        'whitepiece': "url('./assets/img/white.svg')",
        'blackpiece': "url('./assets/img/black.svg')",
        'finale': "url('./assets/img/finale.svg')",
        'ouverture': "url('./assets/img/ouverture.svg')",
        'pion': "url('./assets/img/pion.svg')",
        'cross': "url('./assets/img/cross.svg')",
        'edit': "url('./assets/img/edit.svg')",
        'empty_o': "url('./assets/img/empty_o.svg')",
        'empty_v': "url('./assets/img/empty_v.svg')",
      },
      backgroundSize: {
        'icon-left':"20px",
        'icon-right':"10px",
        '20':"20px",
        'edit':"25px"
      },
      backgroundPosition:{
        'icon-left': '7px center',
        'icon-right':"right center",
        'center' : "center center"
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' }
        },
        write: {
          '0%': { transform: 'rotate(0deg) translateX(0px)'},
          '20%': { transform: 'rotate(10deg) translateX(2px)'},
          '40%': { transform: 'rotate(-10deg) translateX(4px)'},
          '60%': { transform: 'rotate(10deg) translateX(6px)'},
          '80%': { transform: 'rotate(-10deg) translateX(8px)'},
          '100%': {transform: 'rotate(10deg) translateX(10px)'}
        }
      }
    },
  },
  variants: {
    extend: {animation: ['hover', 'focus']},
  },
  plugins: [],
}
