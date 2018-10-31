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
        loader: "babel-loader",
        options: {
          plugins: [
            "styled-jsx/babel"
          ]
        }
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
    contentBase: resolve(__dirname, './'),
    publicPath: '/'
  }
};