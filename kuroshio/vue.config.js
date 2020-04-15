const configureWebpack = config => {
  return {
    resolve: {
    alias: {
        'ScrollToPlugin': 'gsap/ScrollToPlugin.js',
        'ScrollMagic': 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js',
        'debug.addIndicators': 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'
      }
    }
  }
}

module.exports = {
    publicPath: './',
    configureWebpack
}