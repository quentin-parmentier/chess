const plugin = require('tailwindcss/plugin')
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height:{
        px425:"425px"
      },
      inset:{
        vh80:"80vh",
        vw85:"85vw"
      },
      margin:{
        n122:"-122px",
        n168:"-168px",
        n174:"-174px",
        n188:"-188px",
        n195:"-195px",
        n214:"-214px",
      },
      minHeight:{
        fullvh:"100vh"
      },
      maxHeight:{
        "400":"400px"
      },
      maxWidth:{
        px800:"800px",
        '128':"128px"
      },
      minWidth:{
        "400":"400px"
      },
      spacing: {
        "200":"200px",
        "56":"56px"
      },
      boxShadow: {
        "basic":"#a8a7a7 5px 7px 4px 0px",
        "modal":"#a8a7a7 0px 6px 35px",
        "littleup":"#c7c6c6 6px 7px 8px 0px",
        "up": "#c7c6c6 12px 21px 8px 0px",
        'innerinput': 'inset 0 0px 0px 1px rgb(209, 213, 219)',
        'innerinput-focus': 'inset 0 1px 4px 0px rgb(178 0 0)'
      },
      animation: {
        "pop" : "pop ease 300ms",
        "write": "write ease 1000ms",
        "slide": "slide ease 300ms"
      },
      backgroundImage: {
        'arrow_back': "url('./assets/img/arrow_back.svg')",
        'whitepiece': "url('./assets/img/white.svg')",
        'blackpiece': "url('./assets/img/black.svg')",
        'finale': "url('./assets/img/finale.svg')",
        'ouverture': "url('./assets/img/ouverture.svg')",
        'pion': "url('./assets/img/pion.svg')",
        'tour': "url('./assets/img/tour.svg')",
        'dame': "url('./assets/img/dame.svg')",
        'cross': "url('./assets/img/cross.svg')",
        'edit': "url('./assets/img/edit.svg')",
        'accueil': "url('./assets/img/accueil.svg')",
        'profil': "url('./assets/img/profil.svg')",
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
      flex:{
        '45':'0 0 45vh'
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' }
        },
        slide: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' }
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
  plugins: [plugin(function({ addComponents }) {
    const globalComponents = {
      '.bisquare': {
        minWidth:"250px",
        maxWidth:"400px",
        minHeight:"250px",
        maxHeight:"400px",
        height:"80vw",
        flex:"0 1 80vw"
      },
      '.smallsquare': {
        minWidth:"250px",
        maxWidth:"250px",
        minHeight:"250px",
        maxHeight:"250px",
        height:"80vw",
        flex:"0 1 80vw"
      },
      '.flexcenter' : {
        display:"flex",
        flexWrap:"wrap",
        justifyContent:"center",
        alignItems:"center",
        gap:"1.25rem"
      },
      '.h1' : {
        padding:"2rem",
        textAlign:"center",
        fontWeight:"700",
        fontSize: "1.875rem",
        lineHeight: "2.25rem"
      },
      '.titleRegister' : {
        padding:"1.2rem",
        textAlign:"center",
        fontWeight:"700",
        fontSize: "1.875rem",
        lineHeight: "2.25rem"
      },
      '.h2' : {
        padding:"2rem",
        textAlign:"center",
        fontWeight:"700",
        fontSize: "1.5rem",
        lineHeight: "2rem"
      },
      '.h4' : {
        textAlign:"center",
        fontWeight:"400",
        fontSize: "1.2rem",
        lineHeight: "1.5rem"
      },
      '.btn-return' : {
        marginLeft:"10px",
        boxShadow:"none",
        color:"#2563EB",
        '&:hover':{
          color:"#4c7ce6"
        }
      }
    }
      addComponents(globalComponents)
    })
  ],
}
