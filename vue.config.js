module.exports = {
  transpileDependencies: [
    /\bvue-awesome\b/
  ],
  devServer: {
    proxy: {
      '^/(v1|socket.io)': {
        target: 'https://mychannels.gq/',
        ws: true,
        changeOrigin: true
      },
    },
    watchOptions: {
      poll: true,
      ignored: /node_modules/
    },
  }
};