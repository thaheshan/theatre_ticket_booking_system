module.exports = {
   darkMode: 'class', // important
   
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  corePlugins: {
    // Disable legacy float plugin if needed
    float: false 
  },
  theme: {
    extend: {},
  },
  plugins: [],
}