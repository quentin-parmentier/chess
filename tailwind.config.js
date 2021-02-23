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
      maxWidth:{
        px800:"800px"
      },
      boxShadow: {
        "basic":"#c7c6c6 6px 7px 8px 0px",
        "up": "#c7c6c6 12px 21px 8px 0px"
      },
      animation: {
        "colorchange" : "fill ease 500ms"
      },
      backgroundImage: {
        'arrow_back': "url('./assets/img/arrow_back.svg')",
        'whitepiece': "url('./assets/img/white.svg')",
        'blackpiece': "url('./assets/img/black.svg')"
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
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
