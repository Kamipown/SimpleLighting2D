module.exports = {
  outputDir: 'docs',
  publicPath: '/SimpleLighting2D',
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/styles";
        `
      }
    }
  }
}
