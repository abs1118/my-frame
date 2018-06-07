const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'mobx', 'mobx-react', './src/polyfill','mobx-react-router','react-router','react-router-dom', 'moment', 'moment/locale/zh-cn'],
  },

  output: {
    path: path.join(__dirname, 'dll'),
    filename: '[name].js',
    library: '[name]',
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dll', 'manifest.json'),
      filename: '[name].js',
      name: '[name]',
    }),
  ]
};