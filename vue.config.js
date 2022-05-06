const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.88.108:3000',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""	//萬用字元
        }
      }
    }
  }
});
