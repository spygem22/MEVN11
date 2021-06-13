module.exports = {
  // transpileDependencies: ['vuetify'],
    devServer: {
      proxy: 'http://localhost:5000'
     
      // open: process.platform === 'darwin',
      // host: '0.0.0.0',
      // port: 5000, // CHANGE YOUR PORT HERE!
      // https: false,
      // hotOnly: false,
    },
};
