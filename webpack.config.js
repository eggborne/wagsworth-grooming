const webpack = require('webpack');
const { resolve } = require('path');


module.exports = {
  entry: [
    resolve(__dirname, "src", "index.jsx")
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'app.bundle.js'
  },
  devServer: {
    // hot: true,
    contentBase: resolve(__dirname, './'),
    publicPath: '/'
  }
};