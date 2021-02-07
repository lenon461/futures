const path = require('path');

module.exports = {
  lintOnSave: true,
  devServer: {
    port: 5001
  },
  configureWebpack: {
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src/')
        }
    }
  }
};
