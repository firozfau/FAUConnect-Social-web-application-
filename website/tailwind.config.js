module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode:'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'custom-green': '#077D55',
        'sender-color': '#88DBA8',
        'reciever-color': '#077D55',
        'chat-side-nav': '#075E45',
        'secondary': '#88DBA8',
        'custom-darkgreen' : '#092E25',
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['hover', 'focus'], // Add 'hover' if it's not already present
    },
  },
  plugins: [],
}

