module.exports = {
  pwa:{
    workboxPluginMode:"InjectManifest",
    workboxOptions:{
      swSrc:"src/service-worker.js",
    }
  },
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
